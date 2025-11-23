const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 9000;

const userRouter = require("./routes/user.js");

require("./db/index"); // DB 연결 초기화(콘솔에서 연결 결과 확인)
require("./db/user"); // 스키마 초기화: users 테이블 생성(없으면)
require("./db/club"); // 스키마 초기화: clubs 테이블 생성(없으면)

// 미들웨어 설정 (라우터 설정 전에 배치)
app.use(express.json());
app.use(cookieParser()); // 쿠키 파서 추가

// CORS 설정 (쿠키 사용을 위해 credentials 필요)
app.use((req, res, next) => {
  // 허용할 origin 목록
  const allowedOrigins = ["http://localhost:3008", "http://192.168.0.3:3008"];

  const origin = req.headers.origin;

  // 요청 origin이 허용 목록에 있으면 허용
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // 쿠키 사용을 위해 필요

  // OPTIONS 요청 처리 (preflight)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// 라우터 설정
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
  console.log(`server is running on http://192.168.0.3:${port}`);
});
