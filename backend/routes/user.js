const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../utils/jwt");

// 기본 라우터 ("/api/user")

router.get("/", (req, res) => {});

// 회원가입 요청
router.post("/join", async (req, res) => {
  try {
    const { email, password, name, age, gender, phone, address } = req.body;

    // 필수 필드 검증
    if (!email || !password || !name || !age || !gender || !phone || !address) {
      return res.status(400).json({
        message: "모든 필드를 입력해주세요.",
      });
    }

    const user = await userModel.create({
      email,
      password,
      name,
      age,
      gender,
      phone,
      address,
    });

    res.status(201).json({
      message: "회원가입이 완료되었습니다.",
      user,
    });
  } catch (error) {
    console.error("회원가입 오류:", error);

    // 이메일 중복 에러 처리
    if (error.status === 409) {
      return res.status(409).json({
        message: error.message,
      });
    }

    // 기타 에러 처리
    res.status(500).json({
      message: "회원가입 중 오류가 발생했습니다.",
    });
  }
});

// 로그인 요청
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "존재하지 않는 이메일입니다." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    // Access Token 생성
    const accessToken = generateAccessToken(user);

    // 비밀번호 제외한 사용자 정보
    const userInfo = {
      id: user.id,
      email: user.email,
      username: user.username,
      age: user.age,
      gender: user.gender,
      phone: user.phone,
      address: user.address,
    };

    // 쿠키에 토큰 저장
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // XSS 공격 방지 (JavaScript로 접근 불가)
      secure: false, // 개발 환경에서는 false, 프로덕션에서는 true (HTTPS 사용 시)
      sameSite: "lax", // CSRF 공격 방지
      maxAge: 60 * 60 * 1000, // 1시간 (밀리초)
    });

    res.status(200).json({
      message: "로그인 성공",
      user: userInfo,
    });
  } catch (error) {
    console.error("로그인 오류:", error);
    res.status(500).json({ message: "로그인 중 오류가 발생했습니다." });
  }
});

// 로그아웃 요청
router.post("/logout", (req, res) => {
  try {
    // 쿠키 삭제
    res.clearCookie("accessToken");

    res.status(200).json({
      message: "로그아웃 성공",
    });
  } catch (error) {
    console.error("로그아웃 오류:", error);
    // 에러가 나도 쿠키는 삭제
    res.clearCookie("accessToken");
    res.status(200).json({ message: "로그아웃 성공" });
  }
});

module.exports = router;
