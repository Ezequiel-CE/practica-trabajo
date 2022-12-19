/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Row } from 'antd';
import UserCard from './UserCard';

function UserList({ users }) {
  return (
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
    >
      {users.map((data) => (
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }} key={data.id}>
          <UserCard data={data} />
        </Col>
      ))}
    </Row>
  );
}

export default UserList;
