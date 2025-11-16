const connection = require("./index");

const createUsersTableSQL = `
CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`username\` VARCHAR(255) NOT NULL ,
  \`age\` INT NOT NULL,
  \`gender\` VARCHAR(255) NOT NULL,
  \`phone\` VARCHAR(255) NOT NULL,
  \`address\` VARCHAR(255) NOT NULL,
  \`email\` VARCHAR(255) NOT NULL,
  \`password\` VARCHAR(255) NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

connection.query(createUsersTableSQL, (err) => {
  if (err) {
    console.error("users 테이블 생성 실패:", err);
    return;
  }
  console.log("users 테이블 확인/생성 완료");
});

module.exports = {};
