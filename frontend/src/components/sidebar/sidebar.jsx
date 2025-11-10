import styles from "./sidebar.module.scss";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.logo}>Club Record</span>
        <p className={styles.subtitle}>팀 기록을 한눈에</p>
      </div>

      <nav className={styles.nav}>
        <button type="button" className={styles.navButton}>
          메인 화면
        </button>
      </nav>

      <div className={styles.footer}>
        <span>버전 0.1</span>
        <span>© 2025 Club Record</span>
      </div>
    </aside>
  );
};

export default Sidebar;
