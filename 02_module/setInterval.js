//setInterval.js
let wordAry =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident animi    minus eaque dignissimos rerum in maiores magni sapiente doloremque molestias    perferendis dolor corporis magnam, temporibus incidunt eveniet! A, quis    error." //
    .split(" ");

let search = "sit,";
let idx = wordAry.indexOf(search);
//splice(바꿀인덱스번호, 앞의인덱스번호부터 몇번째까지 인덱스까지 수정할지의 범위갯수지정, 앞에 지정한 범위의 수정할 내용 입력)
wordAry.splice(idx, 1); //대체할값 않넣어주면 삭제임
console.log(wordAry);

// wordAry.forEach((word) => {
//   console.log(word);
// });
