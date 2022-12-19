import React from 'react';
import { Layout, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import UserList from '../components/UserList';
import AddModal from '../components/AddModal';
import { openModal } from '../redux/reducers/modal';
import Spinner from '../components/shared/Spinner';
import './Home.style.scss';

const { Header, Content, Footer } = Layout;

function Home() {
  const dispatcher = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);

  let content;

  if (isLoading && users.length === 0) {
    content = <Spinner />;
  } else {
    content = (
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Layout
          className="site-layout-background no-background"
          style={{
            padding: '24px 0',
          }}
        >
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            {users.length >= 1 && <UserList users={users} />}
          </Content>
        </Layout>
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" size="large" shape="round" onClick={() => dispatcher(openModal())}>
            Add user
          </Button>
          <AddModal />
        </div>
      </Content>
    );
  }

  return (
    <Layout className="layout">
      <Header className="header">
        <h1>User List</h1>
      </Header>
      {content}
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2022 Created by me
      </Footer>
    </Layout>
  );
}

export default Home;
