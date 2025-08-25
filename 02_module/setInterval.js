//setInterval.js

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// count: 100 ->  0 1 씩 감소.
let count = 100;
setInterval(() => {
  count--;
  //console.log(`현재 count: ${count}`);
  if (count == 0 && wordAry.length == 0) {
    console.log(`승공`);
    process.exit();
  }
  if (count == 0 && wordAry.length != 0) {
    console.log(`실패`);
    process.exit();
  }
}, 1000);
let wordAry = "Lorem ipsum dolor sit, amet consectetur adipisicing elit." // Provident animi    minus eaque dignissimos rerum in maiores magni sapiente doloremque molestias    perferendis dolor corporis magnam, temporibus incidunt eveniet! A, quis    error." //
  .split(" ");

function myFunction() {
  if (count < 0 || wordAry.length == 0) {
    console.log(`승공`);
    rl.close();
    process.exit();
  }
  rl.question("단어를 입력하세요.", (answer) => {
    console.log(typeof answer);
    let search = answer;
    let idx = wordAry.indexOf(search);
    //splice(바꿀인덱스번호, 앞의인덱스번호부터 몇번째까지 인덱스까지 수정할지의 범위갯수지정, 앞에 지정한 범위의 수정할 내용 입력)
    wordAry.splice(idx, 1); //대체할값 않넣어주면 삭제임
    //console.log(wordAry);

    wordAry.forEach((word) => {
      console.log(word);
    });
    myFunction();
  });

  // if (wordAry.length == 0) {
  //   break;
  // }
}
myFunction();
