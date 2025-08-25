let reg = /World/;
reg = new RegExp("World");

let str = `Hello Hi..
World!
world`;

console.log(str.replace(/World/gi, "세상!"));

console.log(reg.test(str)); //indexOf랑 비슷하게 해당문장이 있는지 T/F 로 반환해줌

console.log(reg.exec(str)); //그냥 indexOf임
