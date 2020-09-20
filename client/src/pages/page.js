import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import Logo from '../assets/logo.png';

const { Header, Content, Footer } = Layout;

function Page(props) {
    const noFooter = props.noFooter;
    const page = props.page;
    const content = props.content;

    return (
        <Layout className="layout">
            <Header className="header" style={{backgroundColor: "white"}} theme="light">
                <div style={{height: "50%", float: "left", paddingRight: "50px"}} className="logo">
                    <Link to="/">
                        <img src={Logo} style={{height: "100%"}} alt="logo" />
                    </Link>
                </div>
                <Menu style={{textAlign: "right"}} theme="light" mode="horizontal" defaultSelectedKeys={[page]}>

                    <Menu.Item key="home">Home<Link to="/" /></Menu.Item>
                    <Menu.Item key="groups">Groups<Link to="/groups" /></Menu.Item>
                    <Menu.Item key="profile">Profile<Link to="/profile" /></Menu.Item>
                </Menu>
            </Header>
            <Content>
                {content}
            </Content>
            {(noFooter) ? null: <Footer style={{ textAlign: 'center' }}>Gameroom 2020</Footer>}
        </Layout> 
    );
	
}

export default Page;
