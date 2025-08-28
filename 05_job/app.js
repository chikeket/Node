const express = require("express");
//환경변수를 이용하려면 변수가 적용된 파일보다 상위에서 로드가 되게 코드를 작성해야한다
require("dotenv").config({
  path: "./.env",
});
const nodemail = require("./nodemail");
const multer = require("multer");
const excel = require("./excel");
// const process = require("process");

// console.log(process.env);
const app = express();
app.use(express.urlencoded()); //요청정보에 있는 x-www-form-urlencoded

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/file/");
  },
  filename: (req, file, cb) => {
    const originalname = Buffer.from(file.originalname, "latin1")//
      .toString("utf8");
    // 날짜 포맷 함수
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const sec = String(now.getSeconds()).padStart(2, "0");

    const formatted = `${year}-${month}-${day}--${hour}_${min}_${sec}`;

    cb(null, `${formatted} ${originalname}`); //2025-08-20-HH:MM:SS+홍길동.jpg
  },
});

const uploads = multer({
  storage: storage,
});

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
          <th>파일업로드:</th>
          <td><input type="file" name="filename" id="" /></td>
        </tr>
        <tr>
          <td colspan="2" align="center">
            <input type="submit" value="메일보내기" name="" id="" />
          </td>
        </tr>
      </table>
      
    </form>`);
});
app.post("/mail", uploads.single("filename"), (req, resp) => {
  console.log(req.body);   // 이제 sender, receiver, subject, content 다 찍힘
  console.log(req.file);   // 업로드된 파일 정보 찍힘

  let file = req.file; // multer가 넣어주는 파일 객체
  let data = {
    from: req.body.sender,
    to: req.body.receiver,
    subject: req.body.subject,
    text: req.body.content,
    attachments: file
      ? [
        {
          filename: file.originalname, // 메일에 표시될 파일명
          path: file.path,             // 서버에 저장된 파일 경로 (여기서 path가 생김!)
        },
      ]
      : [],
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
