import styles from "./login.module.scss";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import useUserStore from "../../store/userStore";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const formik = useFormik({
    initialValues: {
      email: "test@gmail.com",
      password: "123",
    },
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/api/user/login", values);

        // 스토어에 유저 정보 저장
        if (response.data.user) {
          login(response.data.user);
        }

        alert(response.data.message || "로그인 성공");
        navigate("/home");
      } catch (error) {
        console.error("로그인 오류:", error);
        if (error.response?.status === 401) {
          alert(
            error.response.data.message ||
              "이메일 또는 비밀번호가 일치하지 않습니다."
          );
        } else {
          alert(
            error.response?.data?.message || "로그인 중 오류가 발생했습니다."
          );
        }
      }
    },
  });

  // 회원가입 페이지로 이동
  const MovePage = () => {
    navigate("/join");
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.logo}>ClubRecord</div>
        <div className={styles.titleSection}>
          <div className={styles.subtitle}>Start your journey</div>
          <div className={styles.title}>Sign in to ClubRecord</div>
        </div>
        <form className={styles.content} onSubmit={formik.handleSubmit}>
          <div className={styles.login_section}>
            <label>E-mail</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="example@email.com"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <span className={styles.inputIcon}>✉</span>
            </div>
          </div>
          <div className={styles.password_section}>
            <label>Password</label>
            <div className={styles.inputWrapper}>
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <span className={styles.inputIcon}>👁</span>
            </div>
          </div>
          <div className={styles.button_section}>
            <button type="submit">Sign In</button>
          </div>
          <div className={styles.divider}>
            <span>or sign in with</span>
          </div>
          <div className={styles.socialButtons}>
            <button type="button" className={styles.socialButton}>
              <span className={styles.socialIcon}>f</span>
            </button>
            <button type="button" className={styles.socialButton}>
              <span className={styles.socialIcon}>G</span>
            </button>
            <button type="button" className={styles.socialButton}>
              <span className={styles.socialIcon}>🍎</span>
            </button>
          </div>
        </form>
        <div className={styles.footer}>
          <span>Don't have an account?</span>
          <span className={styles.footerLink} onClick={MovePage}>
            Sign Up
          </span>
        </div>
      </div>
      <div className={styles.rightPanel}></div>
    </div>
  );
};

export default Login;
