let name = "민윤기";
let score = 80;

console.log("이름은 " + name + ", 점수는 " + score);
console.log(
  `이름은 "  ${name} , 점수는${score}, 합격여부${
    score > 60 ? "합격" : "불합격"
  }`
);

[1, 2, 3].forEach((element) => {
  console.log(element);
});

function sum(num1, num2) {
  let result;
  result = num1 + num2;
  return result;
}

const NumberFormat = "2025.08.08";
// NumberFormat = "2025.08.09"; 상수변수는 재할당이 불가.
for (let i = 1; i <= 5; i++) {
  if (i % 2) {
    // falsy : 0, null, "", undefined
    let name = "king"; //{}유효한 값을 유지
    console.log(name);
  } else {
    console.log(name);
  }
  // 변수이름이 블록단위에 있다면 블록단위의 변수를 먼저 적용하고
  //없다면 전역변수에 선언한 변수가 적용이 됨
}
if (score) {
  let name = "홍길동";
  console.log(name);
}
