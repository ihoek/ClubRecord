import styles from "./main.module.scss";

// components
import Calendar from "../../components/Calendar/Calendar";
import Club from "../../components/Club/Club";
const Main = () => {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.left_content}>
          <div className={styles.calendar}>
            <Calendar />
          </div>
          <div className={styles.calendar_content}>달력 컨텐츠 부분</div>
        </div>
        <div className={styles.right_content}>
          <div className={styles.right_content_header}>
            <Club />
          </div>
          <div className={styles.right_content_info}>동아리 인원</div>
          <div className={styles.right_content_activity}>동아리 활동 내역</div>
        </div>
      </div>
    </div>
  );
};

export default Main;
