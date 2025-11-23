const connection = require("./index");

const createClubsTableSQL = `
CREATE TABLE IF NOT EXISTS \`clubs\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`clubname\` VARCHAR(255) NOT NULL,
  \`age\` INT NOT NULL,
  \`gender\` VARCHAR(255) NOT NULL COMMENT '사용자의 허용되는 성별: "man", "woman", "both", "no"',
  \`address\` VARCHAR(255) NOT NULL COMMENT '사용자의 허용되는 주소: "y", "n"',
  \`ownerId\` INT UNSIGNED NOT NULL,
  \`memberMax\` INT UNSIGNED NOT NULL,
  \`memberMin\` INT UNSIGNED NOT NULL,
  \`memberCurrent\` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '현재 멤버수',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_ownerId\` (\`ownerId\`),
  CONSTRAINT \`fk_clubs_owner\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

connection.query(createClubsTableSQL, (err) => {
  if (err) {
    console.error("clubs 테이블 생성 실패:", err);
    return;
  }
  console.log("clubs 테이블 확인/생성 완료");
});

module.exports = {};
