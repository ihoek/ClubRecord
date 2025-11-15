import styles from "./App.module.scss";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// components
import Main from "./pages/main/main";
import Sidebar from "./components/sidebar/sidebar";
import Login from "./pages/login/login";

// utils
import { sidebarItems } from "./utils/list";

function App() {
  // 변수 선언
  const hideSidebarPaths = ["/login", "/join"];
  const location = useLocation();
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  return (
    <div className={styles.app}>
      {shouldHideSidebar ? (
        // 사이드바 숨기는 경우
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      ) : (
        // 사이드바 보이는 경우
        <>
          <div className={styles.sidebar}>
            <Sidebar sidebarItems={sidebarItems} />
          </div>
          <div className={styles.main}>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/home" element={<Main />} />
              <Route path="/login" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
