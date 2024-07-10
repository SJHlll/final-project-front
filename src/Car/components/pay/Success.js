import { useEffect } from 'react';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import styles from './Pay.module.scss';
export function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleCloseWindow = () => {
    window.close();
  };

  useEffect(() => {
    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
    const requestData = {
      orderId: searchParams.get('orderId'),
      amount: searchParams.get('amount'),
      paymentKey: searchParams.get('paymentKey'),
    };

    async function confirm() {
      const response = await fetch(
        'http://plugngo.site/confirm',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        },
      );

      const json = await response.json();

      if (!response.ok) {
        // 결제 실패 비즈니스 로직을 구현하세요.
        navigate(
          `/fail?message=${json.message}&code=${json.code}`,
        );
      } else {
        // 결제 성공 비즈니스 로직을 구현하세요.
        console.log('결제 성공 로직 들어감');
        console.log(
          '주문번호 : ' + searchParams.get('orderId'),
        );
        console.log(
          '주문내용 : ' + searchParams.get('paymentKey'),
        );
        console.log(
          '결제금액 : ' + searchParams.get('amount') + '원',
        );
      }
    }
    confirm();
  }, [searchParams, navigate]);

  return (
    <div className={styles.resultWrapper}>
      <div className={styles.boxSection}>
        <h2 className={styles.payHead}>결제 성공</h2>
        <p
          className={styles.payBody}
        >{`주문번호: ${searchParams.get('orderId')}`}</p>
        <p
          className={styles.payBody}
        >{`paymentKey: ${searchParams.get('paymentKey')}`}</p>
        <p
          className={`${styles.payBody} ${styles.payAmount}`}
        >{`결제 금액: ${Number(
          searchParams.get('amount'),
        ).toLocaleString()}원`}</p>
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
