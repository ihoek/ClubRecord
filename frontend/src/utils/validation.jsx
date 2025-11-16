import * as yup from "yup";

// 회원가입 유효성검사 스키마
export const joinValidationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
  name: yup.string().required("Name is required"),
  age: yup.number().required("Age is required"),
  gender: yup.string().required("Gender is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
});
