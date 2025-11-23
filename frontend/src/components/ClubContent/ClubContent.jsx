import styles from "./ClubContent.module.scss";

// 카드 색상 배열
const cardColors = [
  "#ff6b6b", // 빨강-오렌지
  "#9775fa", // 퍼플
  "#4c6ef5", // 파랑
  "#51cf66", // 그린
  "#ffd43b", // 옐로우
  "#ff922b", // 오렌지
  "#339af0", // 스카이 블루
];

const ClubContent = ({
  content,
  index = 0,
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
  hasHoveredSibling = false,
}) => {
  const cardColor = cardColors[index % cardColors.length];

  return (
    <div
      className={`${styles.container} ${isHovered ? styles.hovered : ""} ${
        hasHoveredSibling && !isHovered ? styles.blurred : ""
      }`}
      style={{ "--card-color": cardColor }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.header}>
        <div className={styles.title}>{content.name}</div>
      </div>
      <div className={styles.content}>
        <div className={styles.description}>{content.description}</div>
        <div className={styles.info_section}>
          <div className={styles.gender}>선호 성별: {content.gender}</div>
          <div className={styles.address}>주소: {content.address}</div>
          <div className={styles.member_info}>
            <div className={styles.memberCurrent}>
              현재 멤버: {content.memberCurrent}/{content.maxMemberCount}
            </div>
            <div className={styles.minMemberCount}>
              최소: {content.minMemberCount}명
            </div>
          </div>
          <div className={styles.footer}>
            <button className={styles.view_button}>상세보기</button>
            <button className={styles.join_button}>참여하기</button>
          </div>
        </div>
        <div className={styles.createdAt}>{content.createdAt}</div>
      </div>
    </div>
  );
};

export default ClubContent;
