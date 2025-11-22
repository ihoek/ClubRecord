import styles from "./join.module.scss";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { joinValidationSchema } from "../../utils/validation";
import axiosInstance from "../../utils/axiosInstance";

const Join = () => {
  const navigate = useNavigate();

  // 전화번호 입력 시 자동으로 010-1234-1234 형태로 포맷
  const formatPhone = (value) => {
    const onlyDigits = String(value || "")
      .replace(/\D/g, "")
      .slice(0, 11);
    if (onlyDigits.length <= 3) return onlyDigits;
    if (onlyDigits.length <= 7)
      return `${onlyDigits.slice(0, 3)}-${onlyDigits.slice(3)}`;
    return `${onlyDigits.slice(0, 3)}-${onlyDigits.slice(
      3,
      7
    )}-${onlyDigits.slice(7)}`;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      age: "",
      gender: "",
      phone: "",
      address: "",
    },
    validationSchema: joinValidationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        // passwordConfirm은 서버로 전송하지 않음
        const { passwordConfirm: _passwordConfirm, ...submitData } = values;
        const response = await axiosInstance.post("/api/user/join", submitData);
        console.log("회원가입 성공:", response.data);
        alert(response.data.message || "회원가입이 완료되었습니다.");
        navigate("/login");
      } catch (error) {
        console.error("회원가입 오류:", error);
        if (error.response?.status === 409) {
          // 이메일 중복 에러
          setFieldError(
            "email",
            error.response.data.message || "이미 존재하는 이메일입니다."
          );
        } else {
          alert(
            error.response?.data?.message || "회원가입 중 오류가 발생했습니다."
          );
        }
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.logo}>ClubRecord</div>
        <div className={styles.titleSection}>
          <div className={styles.subtitle}>Start your journey</div>
          <div className={styles.title}>Sign Up to ClubRecord</div>
        </div>
        <form className={styles.content} onSubmit={formik.handleSubmit}>
          <div className={styles.email_section}>
            <label>E-mail</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="example@email.com"
                name="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <span className={styles.inputIcon}>✉</span>
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className={styles.error}>{formik.errors.email}</div>
            )}
          </div>
          <div className={styles.password_section}>
            <label>Password</label>
            <div className={styles.inputWrapper}>
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className={styles.error}>{formik.errors.password}</div>
            )}
          </div>
          <div className={styles.password_confirm_section}>
            <label>Password Confirm</label>
            <div className={styles.inputWrapper}>
              <input
                type="password"
                placeholder="Confirm Password"
                name="passwordConfirm"
                id="passwordConfirm"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
              />
            </div>
            {formik.touched.passwordConfirm &&
              formik.errors.passwordConfirm && (
                <div className={styles.error}>
                  {formik.errors.passwordConfirm}
                </div>
              )}
          </div>
          <div className={styles.name_section}>
            <label>Name</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <div className={styles.error}>{formik.errors.name}</div>
            )}
          </div>
          <div className={styles.age_section}>
            <label>Age</label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                placeholder="Age"
                name="age"
                id="age"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
              />
            </div>
            {formik.touched.age && formik.errors.age && (
              <div className={styles.error}>{formik.errors.age}</div>
            )}
          </div>
          <div className={styles.gender_section}>
            <label>Gender</label>
            <div className={styles.radioWrapper}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  id="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.gender === "male"}
                />
                <span>Male</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  id="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.gender === "female"}
                />
                <span>Female</span>
              </label>
            </div>
            {formik.touched.gender && formik.errors.gender && (
              <div className={styles.error}>{formik.errors.gender}</div>
            )}
          </div>
          <div className={styles.phone_number_section}>
            <label>Phone Number</label>
            <div className={styles.inputWrapper}>
              <input
                type="tel"
                placeholder="Phone Number"
                name="phone"
                id="phone"
                onChange={(e) =>
                  formik.setFieldValue("phone", formatPhone(e.target.value))
                }
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                maxLength={13}
              />
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <div className={styles.error}>{formik.errors.phone}</div>
            )}
          </div>
          <div className={styles.address_section}>
            <label>Address</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Address"
                name="address"
                id="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
            </div>
            {formik.touched.address && formik.errors.address && (
              <div className={styles.error}>{formik.errors.address}</div>
            )}
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
