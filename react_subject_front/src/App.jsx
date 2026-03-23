import styles from './App.module.css';
import './App.css';
import SubjectListPage from './components/commons/pages/subject/SubjectListPage';

function App() {
  return (
    <div>
      <header className={styles.header}>
        <main className="main">
          <SubjectListPage />
        </main>
      </header>
    </div>
  );
}

export default App;
