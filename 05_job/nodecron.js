// nodecron.js
const cron = require("node-cron");
// 초 분 시 월에몇일 몇달 몇요일
cron.schedule("10 15 * * * *", () => {
  let current = new Date();
  console.log(current.toISOString() + " => cron실행됨.");
});
