//app.js
const express = require("express");
const parser = require("body-parser");
const sql = require("./sql");
const cors = require("cors");

const app = express();
app.use(parser.urlencoded()); // x-www-form-urlencoded
app.use(parser.json());
app.use(cors());

app.get("/", (req, resp) => {
  resp.send("/ 실행");
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
