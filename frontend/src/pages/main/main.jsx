import styles from "./main.module.scss";

const Main = () => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>클럽 기록 현황</h1>
        <p className={styles.subtitle}>
          곧 실제 데이터가 연결되면 최신 정보를 볼 수 있어요.
        </p>
      </header>

      <div className={styles.cards}>
        <article className={styles.card}>
          <span className={styles.cardLabel}>이번 주 행사</span>
          <strong className={styles.cardValue}>3건</strong>
        </article>
        <article className={styles.card}>
          <span className={styles.cardLabel}>참여 예정 인원</span>
          <strong className={styles.cardValue}>45명</strong>
        </article>
        <article className={styles.card}>
          <span className={styles.cardLabel}>확인 필요한 공지</span>
          <strong className={styles.cardValue}>2건</strong>
        </article>
      </div>

      <div className={styles.placeholder}>
        아직 그래프와 상세 통계를 준비 중이에요. 기능이 연결되면 이 자리에서 팀
        기록을 시각적으로 확인할 수 있습니다.
      </div>
    </section>
  );
};

export default Main;
