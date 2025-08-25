// [].reduce()
let result = [10, 15, 20, 25, 30].reduce((acc, elem) => {
  console.log(acc, elem);
  if (elem % 2 == 0) {
    acc.push(elem);
  }
  return acc;
}, []);
console.log(result);
