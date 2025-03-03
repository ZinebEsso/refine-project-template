import React from 'react';
import { Spin } from 'antd';

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default LoadingSpinner;