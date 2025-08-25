// process_exe.js
//import process from "process";
//import os from "os";
//import path from "path";
const path = require("path");
console.log(__filename);
console.log(__dirname);

console.log(path.basename(__filename));
console.log(path.basename(__dirname));

let result = path.format({ dir: "c:/user/admin", base: ".gitconfig" });
result = path.parse("C:Users/admin/.gitconfig");
console.log(result);
