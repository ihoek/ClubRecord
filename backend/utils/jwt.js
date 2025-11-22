const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Access Token 생성 (예: 1시간 유효)
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "1h" } // 1시간 유효
  );
};

// Access Token 검증
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
