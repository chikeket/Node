//crypto_exe.js
const crypto = require("crypto");
let pass = crypto.createHash("sha512").update("test1234").digest("base64");

console.log(pass);

const createSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        // 실패.
        reject(err);
      }
      // 성공.
      resolve(buf.toString("base64")); //toString(문자의 인코딩방식 넣는곳)
    });
  }); //end of Promise((resolve, reject))

  // promise
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((err) => console.error(err));
}; //end of createSalt = ()

//createSalt(); // 함수 호출.
//salt 값을 활용해서 평문 -> 암호화문 변경
const createCryptoPassword = async (trPw) => {
  let salt = await createSalt();
  console.log(salt);
  salt =
    "gh23tVAVDwKHb6F1TK9J4HtYvK45Z5JSpGPLhRYAwm73c78nWiaztEHqNWcNHeAm06u9utU+vmVZXho/FGxdzg==";
  pw =
    "9wVLorQ2ERLtfttaqZEd+kg6Fle1dxllq23OUyDoSV6GQRAbOWIcYkoUB3jQTK/WmoWHyG5ug4QmWSJm9jZnUw==";
  crypto.pbkdf2(trPw, salt, 100000, 64, "sha512", (err, buf) => {
    if (err) {
      console.log("err=>", err);
    }
    console.log(buf.toString("base64"));
    let crPw = buf.toString("base64");
    if (pw == crPw) {
      console.log("비밀번호가 동일함.");
    } else {
      console.log("비밀번호를 확인하세요");
    }
  });
};
createCryptoPassword("test1234");
