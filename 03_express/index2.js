// index2.js
const express = require("express");
const app = express(); //express 인스턴스
const bodyParser = require("body-parser"); // body정보 해석처리.
const multer = require("multer");
const path = require("path");
// CORS 동일출처원칙.
const cors = require("cors");

app.use(bodyParser.urlencoded()); //key/value 형식의 방식 처리해줌 (ex id=u01&pw=1111)
app.use(bodyParser.json());
// multer 셋업.
// 이미지 / 일반파일 구분해서 업로드.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/file/");
  },
  filename: (req, file, cb) => {
    const originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    cb(null, new Date().valueOf() + originalname); //2025-08-20-HH:MM:SS+홍길동.jpg
  },
});
const uploads = multer({
  storage: storage,
});
// 이미지 업로드.
const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/image/");
  },
  filename: (req, file, cb) => {
    const originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    cb(null, new Date().valueOf() + originalname); //2025-08-20-HH:MM:SS+홍길동.jpg
  },
});
const imgUploads = multer({
  storage: imgStorage,
  // 파일필터링.
  fileFilter: (req, file, cb) => {
    // 이미지 파일여부
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("이미지 파일만 업로드할수 있습니다"), false);
    }
  },
});
const corsOpt = {
  origin: "http://192.168.56.1:5500",
};
app.use(cors(corsOpt));

app.get("/", (req, resp) => {
  resp.send("/ 요청");
});

// 요청방식: post
app.post("/login", (req, resp) => {
  resp.send("요청id: " + req.body.id + "요청pw: " + req.body.pw);
});

// multi-part요청: http://localhost:3000/upload
app.post("/fileupload", uploads.single("filename"), (req, resp) => {
  console.log(req.file);
  resp.send("파일 업로드 성공");
});
app.post("/imgupload", imgUploads.single("image"), (req, resp) => {
  console.log(req.file);
  resp.send("이미지 업로드 성공");
});

app.get("/bookList", (req, resp) => {
  const list = [
    { no: 1, title: "이것이자바다" },
    { no: 2, title: "웹기초" },
  ];
  resp.json(list);
});

// 에러처리.
app.use((err, req, resp) => {
  if (err instanceof multer.MulterError) {
    resp.status(400).send("Multer에러 발생" + err);
  } else if (err) {
    resp.status(400).send(err);
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000 서버실행");
});
