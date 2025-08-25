// [].sort()

let fruits = ["apple", "cherry", "banana"];

fruits.sort();

fruits.forEach((fruit) => {
  console.log(fruit);
});

let numbers = [1, 10, 100, 2, 12, 44];

//.sort() 정렬기능(오름차순, 내림차순 등등)
numbers.sort(function (a, b) {
  if (a < b) {
    //위치를 변경: 양의값.
    return 1;
  } else {
    //위치를 유지: 음의값.
    return -1;
  }
});

numbers.forEach((number) => {
  console.log(number);
});

// filter()
//[10, 23, 46, 17, 56]
[
  { name: "Hong", point: 10 },
  { name: "Kim", point: 23 },
  { name: "Park", point: 46 },
  { name: "Choi", point: 17 },
  { name: "Hwang", point: 56 },
]
  .filter((elem, idx, ary) => {
    //console.log(elem);
    if (elem.point > 30) {
      return true;
    }
  })
  .forEach((elem) => {
    console.log(`이름은${elem.name}, 점수는${elem.point}`);
  });

//map (mapping)
// A-> A'
// {name, age, point} => {name, point}
