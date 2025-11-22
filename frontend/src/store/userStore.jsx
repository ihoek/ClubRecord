import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../utils/axiosInstance";

const userStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      // 유저 정보 설정
      setUser: (userData) => {
        set({
          user: userData,
          isAuthenticated: !!userData,
        });
      },

      // 로그인 (유저 정보 저장)
      login: (userData) => {
        set({
          user: userData,
          isAuthenticated: true,
        });
      },

      // 로그아웃 (유저 정보 제거)
      logout: async () => {
        try {
          // 서버에 로그아웃 요청 (쿠키 삭제)
          await axiosInstance.post("/api/user/logout");
        } catch (error) {
          console.error("로그아웃 오류:", error);
        } finally {
          // 스토어에서 유저 정보 제거
          set({
            user: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: "user-storage", // localStorage 키
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default userStore;
