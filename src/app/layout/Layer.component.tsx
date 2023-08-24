import React from 'react'
import { Layout, theme } from 'antd';
import CustomMenu from './NavbarMenu.component'
import MainTasks from '../../features/tasks-board/MainTasks.component';
const { Header, Content, Footer } = Layout;

export const ToDoForm: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <CustomMenu />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ background: colorBgContainer, margin: '16px 0' }}>
          <MainTasks />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2023 Created by Kateryna Yatsiuk</Footer>
    </Layout>
  );
};

export default ToDoForm;