const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");

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
    res.status(200).json({ message: "로그인 성공", user });
  } catch (error) {
    console.error("로그인 오류:", error);
    res.status(500).json({ message: "로그인 중 오류가 발생했습니다." });
  }
});
module.exports = router;
