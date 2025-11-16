const mysql = require("mysql2");
require("dotenv").config();

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "clubrecord",
});

// 연결 시도
connection.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err.stack);
    return;
  }
  console.log("MySQL에 성공적으로 연결되었습니다.");
});

module.exports = connection;
