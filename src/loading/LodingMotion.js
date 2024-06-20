import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LodingMotion.scss';

const LodingMotion = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000); // 2초 후에 사라짐

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className='overlay'
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <motion.div
            className='box'
            animate={{
              scale: [1, 2, 2, 1],
              rotate: [0, 90, 180, 360],
              borderRadius: ['50%', '50%', '50%', '50%'],
              opacity: [1, 1, 1, 1, 0], // 2초 후에 사라지게 설정
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              times: [0, 0.2, 0.5, 0.8, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LodingMotion;
