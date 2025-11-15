import styles from "./App.module.scss";
import Main from "./pages/main/main";
import Sidebar from "./components/sidebar/sidebar";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.main}>
        <Main />
      </div>
    </div>
  );
}

export default App;
