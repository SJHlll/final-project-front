import { useSearchParams } from 'react-router-dom';
import styles from './Pay.module.scss';

export function Fail() {
  const [searchParams] = useSearchParams();

  const handleCloseWindow = () => {
    window.close();
  };

  return (
    <div className={styles.resultWrapper}>
      <div className={styles.boxSection}>
        <h2 className={styles.payHead}>결제 실패</h2>
        <p
          className={styles.payBody}
        >{`에러 코드: ${searchParams.get('code')}`}</p>
        <p
          className={styles.payBody}
        >{`실패 사유: ${searchParams.get('message')}`}</p>
        <p
          className={`${styles.publicBtn} ${styles.payButton}`}
          onClick={handleCloseWindow}
        >
          창 닫기
        </p>
      </div>
    </div>
  );
}
