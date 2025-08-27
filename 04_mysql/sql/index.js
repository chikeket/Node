// sql/index.js
const mysql = require("mysql2");

// connect pool 생성.
const pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "dev01",
  password: "dev01",
  database: "dev",
  connectionLimit: 10,
});

function execute(sql = "select * from customers", param = []) {
  //동기 방식으로 바꾸기 위해 만든객체 Promise()
  return new Promise((resolve, reject) => {
    //connection = pool.getConnection();
    pool.getConnection((err, connection) => {
      // getConnection => connection 객체 획득.
      if (err) {
        return reject(err);
      }

      connection.query(sql, param, (queryErr, results) => {
        connection.release(); // connetion => pool 환원.
        if (queryErr) {
          return reject(queryErr);
          0;
        }
        resolve(results);
      }); //end of query().
    }); //end of getConnection().
  }); // end of Promise()
} // end of execute()

module.exports = {
  execute,
};
