import React from 'react';
import { Spin } from 'antd';
import './Spinner.style.scss';

function Spinner() {
  return (
    <div className="container">
      <Spin size="large" />
    </div>
  );
}

export default Spinner;
