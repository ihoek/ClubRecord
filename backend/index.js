const express = require("express");
const app = express();
const port = process.env.PORT || 9000;

const userRouter = require("./routes/user.js");

require("./db/index"); // DB 연결 초기화(콘솔에서 연결 결과 확인)
require("./db/user"); // 스키마 초기화: users 테이블 생성(없으면)

// 라우터 설정
app.use("/api/user", userRouter);

// 미들웨어 설정
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
  console.log(`server is running on http://192.168.0.3:${port}`);
});
