import { useEffect, useState } from 'react';
import styles from './SubjectListPage.module.css';
import { Input } from '../../ui/Form';
import Button from '../../ui/Button';
import axios from 'axios';

const SubjectListPage = () => {
  // 상태
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState(''); // '' = 전체
  const [level, setLevel] = useState(''); // '' = 전체
  const [order, setOrder] = useState(0); // 0: 작성순
  const [subjects, setSubjects] = useState([]);

  // 검색/필터 axios 요청 함수
  const fetchSubjects = () => {
    axios
      .get(`${import.meta.env.VITE_BACKSERVER}/subjects`, {
        params: {
          keyword,
          category,
          level,
          order,
        },
      })
      .then((res) => setSubjects(res.data))
      .catch((err) => console.error(err));
  };

  // 페이지 로드 시 전체 조회
  useEffect(() => {
    fetchSubjects();
  }, []);

  // 검색 버튼 클릭
  const handleSearch = (e) => {
    e.preventDefault();
    fetchSubjects();
  };

  // 검색 조건 초기화
  const handleReset = () => {
    setKeyword('');
    setCategory('');
    setLevel('');
    setOrder(0);
    fetchSubjects();
  };

  return (
    <section className={styles.subject_wrap}>
      <h3 className="page-title">강의 목록</h3>

      {/* 검색/필터 */}
      <div className={styles.list_option_wrap}>
        <form className={styles.search_wrap} onSubmit={handleSearch}>
          <select
            className={styles.select}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">전체 과목</option>
            <option value="백엔드">백엔드</option>
            <option value="프론트엔드">프론트엔드</option>
            <option value="DB">DB</option>
          </select>

          <select
            className={styles.select}
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">전체 난이도</option>
            <option value="1">초급</option>
            <option value="2">중급</option>
            <option value="3">고급</option>
          </select>

          <Input
            type="text"
            placeholder="강의명을 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <Button type="submit" className="btn primary sm">
            검색
          </Button>
          <Button
            type="button"
            className="btn secondary sm"
            onClick={handleReset}
          >
            초기화
          </Button>
        </form>

        <select
          className={styles.select}
          value={order}
          onChange={(e) => {
            setOrder(Number(e.target.value));
            // 선택 즉시 정렬 적용
            fetchSubjects();
          }}
        >
          <option value={0}>작성순</option>
          <option value={1}>난이도 오름차순</option>
          <option value={2}>난이도 내림차순</option>
          <option value={3}>수강인원 오름차순</option>
          <option value={4}>수강인원 내림차순</option>
        </select>
      </div>

      {/* 강의 목록 출력 */}
      <ul className={styles.subject_list}>
        {subjects.length > 0 ? (
          subjects.map((s) => (
            <li key={s.subjectNo} className={styles.subject_item}>
              <h4>{s.subjectTitle}</h4>
              <p>강사: {s.subjectInstructor}</p>
              <p>카테고리: {s.subjectCategory}</p>
              <p>
                난이도:{' '}
                {s.subjectLevel === 1
                  ? '초급'
                  : s.subjectLevel === 2
                    ? '중급'
                    : '고급'}
              </p>
              <p>수강정원: {s.subjectCount}명</p>
            </li>
          ))
        ) : (
          <li>검색 결과가 없습니다.</li>
        )}
      </ul>
    </section>
  );
};

export default SubjectListPage;
