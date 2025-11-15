import styles from "./sidebar.module.scss";

const Sidebar = ({ sidebarItems }) => {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        {/* header */}
        <div className={styles.header}>
          <div>ClubRecord</div>
        </div>

        {/* content */}
        <div className={styles.content}>
          {sidebarItems.map((item, index) => {
            return (
              <div className={styles.item} key={index}>
                <div className={styles.item_icon}>{item.icon}</div>
                <div>{item.label}</div>
              </div>
            );
          })}
        </div>

        {/* footer */}
        <div className={styles.footer}>
          <div className={styles.footer_name}>이정민님</div>
          <div className={styles.footer_logbtn}>로그아웃</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
