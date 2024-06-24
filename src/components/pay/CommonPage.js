import React from 'react';

const CommonPage = () => {
  const handleNavigation = () => {
    const width = 800;
    const height = 800;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      '/pay',
      '_blank',
      `width=${width},height=${height},top=${top},left=${left}`,
    );
  };

  return (
    <div>
      <span
        className='pay-button'
        onClick={handleNavigation}
      >
        결제 창 열기
      </span>
    </div>
  );
};

export default CommonPage;
