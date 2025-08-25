// fs_write.js
const fs = require("fs");
//fs.readFile/fs.readFileSync 활용해서 stdout.log 정보를 읽어들이고
let errBuf = fs.readFileSync("./stdout.log", "utf8");
//file_log.txt에 옮겨 넣기
//writeFile는 비동기처리방식의 코드임(파일명이 똑같으면 누적이 됨)
fs.writeFile(
  "./file_log.txt",
  errBuf,
  { encoding: "utf8", flag: "a" },
  (err) => {
    if (err) {
      console.error("An exception occurred");
      return;
    }
    console.log("File creation complete");
  }
);
