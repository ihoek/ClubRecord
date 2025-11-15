import styles from "./App.module.scss";
import { Routes, Route, Navigate } from "react-router-dom";

// components
import Main from "./pages/main/main";
import Sidebar from "./components/sidebar/sidebar";

// utils
import { sidebarItems } from "./utils/list";

function App() {
  // 변수 선언

  return (
    <div className={styles.app}>
      <div className={styles.sidebar}>
        <Sidebar sidebarItems={sidebarItems} />
      </div>

      <div className={styles.main}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Main />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
