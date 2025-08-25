//fs_read.js
const fs = require("fs");
// 비동기(non블로킹)/동기(블로킹)
fs.readFile("./stdout.log", "utf8", (err, buf) => {
  //이건 비동기방식임 안쪽에 코드가 처리 되지 않아도 밑에줄 코드들도 읽어서 실행시킴
  // callback함수.
  if (err) {
    console.error(err);
    console.error("예외발생");
    return;
  }
  console.log(buf);
});

let errBuf = fs.readFileSync("./stderr.log", "utf8"); //동기방식으로 파일을 불러들이는 방식
console.log(errBuf);

console.log("다른코드");
