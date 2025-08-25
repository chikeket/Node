//fs_watch.js
//읽어들이는 값이 변하면 바뀔때마다 새로 실행이 됨?
const fs = require("fs");
const path = require("path");
let sql = require("./sql.js");

fs.watchFile(__dirname + "/sql.js", (e) => {
  console.log(e);
  console.log("재시작 없이 반영.");
  delete require.cache[require.resolve("./sql.js")];
  sql = require("./sql.js");
});
