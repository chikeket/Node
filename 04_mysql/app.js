//app.js
const express = require("express");
const parser = require("body-parser");
const sql = require("./sql");

const prodSql = require("./sql/sql"); //  {productList:{}, productDetail:{}}
const cors = require("cors");
const fs = require("fs");
// console.log(prodSql["productList"].query);

const app = express();
app.use(parser.urlencoded()); // x-www-form-urlencoded


app.use(
  express.json({
    limit: "10mb",
  })
);
app.use(cors());
app.get("/", (req, resp) => {
  resp.send("/ 실행");
});

// 상품쿼리
app.post("/api/:alias", async (req, resp) => {
  let search = prodSql[req.params.alias].query;
  let param = req.body.param;
  try {
    let result = await sql.execute(search, param);
    console.log(result);
    resp.json(result);
  } catch {
    console.log(err);
    resp.json({ retCode: "Error" });
  }
});

app.post("/upload/:file_name", (req, resp) => {
  let file_name = req.params.file_name;
  let data = req.body.param;
  // console.log(data);
  // console.log(file_name);
  fs.writeFile(__dirname + "/uploads/" + file_name, data, "base64", (err) => {
    if (err) {
      resp.send(err);
      return;
    }
    resp.send("ok");
  });
});

//이미지 링크정보
app.get("/download/:product_id/:path", (req, resp) => {
  let product_id = req.params.product_id;
  let path = req.params.path; //keyboard.jpg
  console.log(path);
  resp.header("Content-Type", `image/${path.substring(path.lastIndexOf("."))}`);
  const filepath = `${__dirname}/uploads/${product_id}/${path}`;
  if (!fs.existsSync(filepath)) {
    resp.send("없다 이자식아");
    return;
  }
  fs.createReadStream(filepath).pipe(resp);
});

// 고객목록.
app.get("/customers", async (req, resp) => {
  try {
    let customerList = await sql.execute("select * from customers");
    console.log(customerList);
    resp.json(customerList);
  } catch {
    console.log(err);
    resp.json({ retCode: "Error" });
  }
});

// 등록.
app.post("/customer", async (req, resp) => {
  console.log(req.body.param);
  try {
    let result = await sql.execute(
      "insert into customers set ?", //
      [req.body.param]
    );
    console.log(result);
    resp.json(result);
  } catch {
    console.log(err);
    resp.json({ retCode: "Error" });
  }
});

// 삭제.
app.delete("/customer/:id", async (req, resp) => {
  console.log(req.params);
  try {
    let result = await sql.execute(
      "delete from customers where ?", //
      [req.params]
    );
    resp.json(result);
  } catch {
    resp.json({ retCode: "Error" });
  }
});

// 수정.
app.put("/customer", async (req, resp) => {
  console.log(req.body);
  try {
    let result = await sql.execute(
      "update customers set ? where id = ?", //
      [req.body.param, req.body.id]
    );
    resp.json(result);
  } catch {
    resp.json({ retCode: "Error" });
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
