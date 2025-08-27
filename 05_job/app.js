const express = require("express");
//환경변수를 이용하려면 변수가 적용된 파일보다 상위에서 로드가 되게 코드를 작성해야한다
require("dotenv").config({
  path: "./.env",
});
const nodemail = require("./nodemail");
const excel = require("./excel");
// const process = require("process");

// console.log(process.env);
const app = express();
app.use(express.urlencoded()); //요청정보에 있는 x-www-form-urlencoded

// 라우팅.
app.get("/", (req, resp) => {
  resp.send("/");
});
app.get("/mail", (req, resp) => {
  resp.send(`<form action="mail" method="post" enctype="multipart/form-data">
      <table>
        <tr>
          <th>보내는이:</th>
          <td>
            <input type="email" name="sender" value="minyounki28@daum.net" />
          </td>
        </tr>
        <tr>
          <th>받는이:</th>
          <td><input type="email" name="receiver" /></td>
        </tr>
        <tr>
          <th>제목:</th>
          <td><input type="text" name="subject" /></td>
        </tr>
        <tr>
          <th>내용:</th>
          <td><textarea name="content"></textarea></td>
        </tr>
        
        <tr>
          <td colspan="2" align="center">
            <input type="submit" value="메일보내기" name="" id="" />
          </td>
        </tr>
      </table>
      
    </form>`);
});
app.post("/mail", (req, resp) => {
  console.log(req.body);
  let data = {
    from: req.body.sender,
    to: req.body.receiver,
    subject: req.body.subject,
    text: req.body.content,
  };
  nodemail.mailSend(data);
  resp.send("done");
});

// "/excel_down => customers 테이블의 데이터를 logs/customer2.xlsx로 저장"
app.get("/excel_down", (req, resp) => {
  excel.db_to_excel("customers2");
  resp.send("✅파일 저장 완료");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
