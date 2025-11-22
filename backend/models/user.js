const connection = require("../db/index");
const bcrypt = require("bcrypt");

const userModel = {
  // 이메일 중복 체크
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email = ?";
      connection.query(query, [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0] || null);
        }
      });
    });
  },

  // 회원가입: 새 사용자 생성
  create: async (userData) => {
    const { email, password, name, age, gender, phone, address } = userData;

    // 이메일 중복 체크
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      const error = new Error("이미 존재하는 이메일입니다.");
      error.status = 409;
      throw error;
    }

    // 비밀번호 해싱
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // DB에 저장 (name을 username으로 매핑)
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO users (email, password, username, age, gender, phone, address)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        email,
        hashedPassword,
        name, // name을 username 필드에 저장
        age,
        gender,
        phone,
        address,
      ];

      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          // 생성된 사용자 정보 반환 (비밀번호 제외)
          const newUser = {
            id: results.insertId,
            email,
            username: name,
            age,
            gender,
            phone,
            address,
          };
          resolve(newUser);
        }
      });
    });
  },
};

module.exports = userModel;
