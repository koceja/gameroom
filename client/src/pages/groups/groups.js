import React from 'react';
import Page from '../page.js';
import { Row, Col, Input } from 'antd';

import './groups.css';


function Content() {
    return (
		<div id="groups">
			<div id="group-list-container">
				<Row id="group-list-header" align="middle">
					<h1>Groups</h1>
				</Row>
				<div id="group-list">
					<Row className="group-list-item" align="middle">
						hi
					</Row>
					<Row className="group-list-item" align="middle">
						hi
					</Row>
					<Row className="group-list-item" align="middle">
						hi
					</Row>
					<Row className="group-list-item" align="middle">
						hi
					</Row>
					<Row className="group-list-item" align="middle">
						hi
					</Row>
					<Row className="group-list-item" align="middle">
						hi
					</Row>
					<Row className="group-list-item" align="middle">
						hi
					</Row>
					<Row className="group-list-item" align="middle">
						hi
					</Row>
					<Row className="group-list-item" align="middle">
						hi
					</Row>
					<Row className="group-list-item" align="middle">
						hi
					</Row>
					<Row className="group-list-item" align="middle">
						hi
					</Row>
					<Row className="group-list-item" align="middle">
						hi
					</Row>
					<Row className="group-list-item" align="middle">
						hi
					</Row>
				
				</div>
			</div>
			<div id="group-chat-container">
				<Row id="group-chat-header" align="middle">
					<h1>
						hi
					</h1>
				</Row>
				<div id="group-chat">
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.aaaa aaaaaaa aaaaaaaa aaaaaaaa aaaaaaaaa aaaaaaaa aaaaaaa</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content author-is-user">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					<Row className="chat-message" align="middle">
						<span className="message-author">Daniel:</span>
						<span className="message-content">I said Hi.</span>
					</Row>
					
				</div>
				<div id="chat-text-box">
					<Input placeholder="Type a message..." size="large" />
				</div>

			</div>
		</div>
	);
}

function Home() {
    return (
        <Page
            page="groups"
            noFooter={true}
            content={<Content />}
        />
    );
}

export default Home;
