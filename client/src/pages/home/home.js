import React from 'react';
import { Row, Col, Card } from 'antd';
import { LikeOutlined, TeamOutlined } from '@ant-design/icons';

import Page from '../page.js';
import logo from '../../assets/logo.png';

import './home.css';

function Content() {
    return (
        <div>
            <Row style={{height: "40vh", backgroundColor: "white", textAlign: "center"}} align="middle">
                <Col xs={{span: 20, offset: 2}} sm={{span: 20, offset: 2}} md={{span: 16, offset: 4}} lg={{span: 14, offset: 5}} xl={{span: 10, offset: 7}} xxl={{span: 8, offset: 8}}>
                    <img style={{width: "100%"}} src={logo} alt="logo" />
                    <h2>Find groups to play your favorite games</h2>
                </Col>
            </Row>
            <div id="home-descriptions">
                <Row>
                    <Col md={{span: 22, offset: 1}} lg={{span: 9, offset: 2}}>
                        <Card className="home-description">
                            <TeamOutlined className="home-icon" />
                            <h1 style={{color: "white"}}>
                                Find groups to play your games
                            </h1>
                            <p style={{textAlign: "left"}}>
                                GameRoom helps you find other players to play your favorite games with. We match you into groups with others playing the same games, and you can chat with the others in the group while playing.
                            </p>
                        </Card>
                    </Col>
                    <Col md={{span: 20, offset: 2}} lg={{span: 9, offset: 2}}>
                        <Card className="home-description">
                            <LikeOutlined className="home-icon"/>
                            <h1 style={{color: "white"}}>
                                Get matched up with people with similar interests
                            </h1>
                            <p style={{textAlign: "left"}}>
                                GameRoom matches players not only by what games they want to play but also the general interests they have. This way, players will be grouped with more compatible personalities, leading to more fun and engaging sessions.
                            </p>
                        </Card>
                    </Col>
                </Row>
            </div>
            
        </div>
        
    );
}

function Home() {
    return (
        <Page
            page="home"
            noFooter={false}
            content={<Content />}
        />
    );
	
}

export default Home;
