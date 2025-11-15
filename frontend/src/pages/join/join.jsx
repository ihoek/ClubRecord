import styles from "./join.module.scss";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const navigate = useNavigate();

  // 로그인 페이지로 이동
  const moveToLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.logo}>ClubRecord</div>
        <div className={styles.titleSection}>
          <div className={styles.subtitle}>Start your journey</div>
          <div className={styles.title}>Sign Up to ClubRecord</div>
        </div>
        <form className={styles.content}>
          <div className={styles.email_section}>
            <label>E-mail</label>
            <div className={styles.inputWrapper}>
              <input type="email" placeholder="example@email.com" />
              <span className={styles.inputIcon}>✉</span>
            </div>
          </div>
          <div className={styles.password_section}>
            <label>Password</label>
            <div className={styles.inputWrapper}>
              <input type="password" placeholder="Password" />
            </div>
          </div>
          <div className={styles.password_confirm_section}>
            <label>Password Confirm</label>
            <div className={styles.inputWrapper}>
              <input type="password" placeholder="Confirm Password" />
            </div>
          </div>
          <div className={styles.name_section}>
            <label>Name</label>
            <div className={styles.inputWrapper}>
              <input type="text" placeholder="Name" />
            </div>
          </div>
          <div className={styles.age_section}>
            <label>Age</label>
            <div className={styles.inputWrapper}>
              <input type="number" placeholder="Age" />
            </div>
          </div>
          <div className={styles.gender_section}>
            <label>Gender</label>
            <div className={styles.radioWrapper}>
              <label className={styles.radioLabel}>
                <input type="radio" name="gender" value="male" />
                <span>Male</span>
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="gender" value="female" />
                <span>Female</span>
              </label>
            </div>
          </div>
          <div className={styles.phone_number_section}>
            <label>Phone Number</label>
            <div className={styles.inputWrapper}>
              <input type="tel" placeholder="Phone Number" />
            </div>
          </div>
          <div className={styles.address_section}>
            <label>Address</label>
            <div className={styles.inputWrapper}>
              <input type="text" placeholder="Address" />
            </div>
          </div>
          <div className={styles.button_section}>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
      <div className={styles.rightPanel}></div>
    </div>
  );
};

export default Join;
