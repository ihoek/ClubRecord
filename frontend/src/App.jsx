import styles from "./App.module.scss";
import Main from "./pages/main/main";
import Sidebar from "./components/sidebar/sidebar";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebarFixed}>
          <Sidebar />
        </div>
      </div>
      <main className={styles.content}>
        <Main />
      </main>
    </div>
  );
}

export default App;
