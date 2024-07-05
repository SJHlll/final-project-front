import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';

// 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요.
// 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
const widgetClientKey =
  'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
const customerKey = nanoid();

export function Checkout() {
  const [paymentWidget, setPaymentWidget] = useState(null);
  const paymentMethodsWidgetRef = useRef(null);

  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(
      window.location.search,
    );
    return urlParams.get(param);
  };
  const [price] = useState(getQueryParam('totalPrice'));

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(
          widgetClientKey,
          customerKey,
        );
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error(
          'Error fetching payment widget:',
          error,
        );
      }
    };

    fetchPaymentWidget();
  }, []);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    const paymentMethodsWidget =
      paymentWidget.renderPaymentMethods(
        '#payment-widget',
        { value: price },
        { variantKey: 'DEFAULT' },
      );

    paymentWidget.renderAgreement('#agreement', {
      variantKey: 'AGREEMENT',
    });

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, price]);

  const handlePaymentRequest = async () => {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: 'Plug & Go', // 상품명
        customerName: '서준혁', // 손님 이름
        customerEmail: 'white4x@naver.com', // 손님 이메일
        customerMobilePhone: '01054983553', // 손님 전화번호
        successUrl: `${window.location.origin}/success`, // http://localhost:3000/success
        failUrl: `${window.location.origin}/fail`, // http://localhost:3000/fail
      });
    } catch (error) {
      console.error('Error requesting payment:', error);
    }
  };

  return (
    <div>
      {/* 아이디 바꾸면 오류뜸 바꾸기 X */}
      {/* 결제 UI, 이용약관 UI 영역 */}
      <div id='payment-widget' />
      <div id='agreement' />
      {/* 결제하기 버튼 */}
      <PaymentButton
        id='payment-button'
        onClick={handlePaymentRequest}
      >
        결제하기
      </PaymentButton>
    </div>
  );
}

const PaymentButton = styled.button`
  float: right;
  margin-right: 20px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
  border: none;
  color: white;
  background-color: #007bff;
  border-radius: 5px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    background-color: #0056b3;
  }
`;
