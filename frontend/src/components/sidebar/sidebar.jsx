import styles from "./Sidebar.module.scss";
import { useNavigate } from "react-router-dom";
// store
import userStore from "../../store/userStore";

const Sidebar = ({ sidebarItems }) => {
  const { user, logout } = userStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

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
              <div
                className={styles.item}
                key={index}
                onClick={() => navigate(item.path)}
              >
                <div className={styles.item_icon}>{item.icon}</div>
                <div>{item.label}</div>
              </div>
            );
          })}
        </div>

        {/* footer */}
        <div className={styles.footer}>
          {user && (
            <>
              <div className={styles.footer_name}>{user.username}님</div>
              <div className={styles.footer_logbtn} onClick={handleLogout}>
                로그아웃
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
