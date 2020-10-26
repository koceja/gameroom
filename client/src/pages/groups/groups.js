import React from 'react';
import Page from '../page.js';
import { Link, useParams, Redirect } from 'react-router-dom';
import { Card, Row, Col, Form, Input, InputNumber, Popover, Button, Checkbox } from 'antd';
import { gql, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';

import './groups.css';

const USER = gql`
  query user($username: String!) {
    user(username: $username) {
      username
	  password
	  uid
	  groups {
		  gid
		  name
		  game
		  messages {
			sender {
				username
			}
			content
		  }
	  }
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($uid: ID!, $content: String!, $gid: ID!) {
    sendMessage(uid: $uid, content: $content, gid: $gid) {
		username
	}
  }
`;

const CREATE_GROUP = gql`
  mutation createGroup($uid: ID!, $game: String!, $groupSize: Int!) {
    createGroup(uid: $uid, game: $game, groupSize: $groupSize) {
		username
	}
  }
`;

const NOTIFICATION_SUBSCRIPTION = gql`
  subscription notificationReceived($uid: ID!) {
    notificationReceived(uid: $uid) {
		username
		password
		uid
		groups {
			gid
			name
			game
			messages {
			  sender {
				  username
			  }
			  content
			}
		}
	  }
	}
  `;

const games = ['chess', 'poker', 'bridge', 'Catan', 'Codewords', 'Uno', 'Secret Hitler'];

function GroupList(props) {
	const data = props.data;
	const groups = props.groups;
	const group = props.group;

	const [
		createGroup,
		{ loading: mutationLoading2, error: mutationError2 }
	] = useMutation(CREATE_GROUP);

	const submitGroup = (values) => {
		createGroup({ variables: { uid: data.user.uid, game: values.game[0], groupSize: values.size } });
	}

	const content = (
		<Form name="basic" onFinish={submitGroup} onFinishFailed={() => (null)} initialValues={{
			remember: true,
		}}>
			<Form.Item name="game" label="game" rules={[
				{
					required: true,
					message: 'Please select a game!'
				}
			]}>
				<Checkbox.Group>
					<Row>
						{games.map((interest) => (<Col span={8}>
							<Checkbox value={`${interest}`} style={{ lineHeight: '32px' }}>
								{interest}</Checkbox>
						</Col>))}
					</Row>
				</Checkbox.Group>
			</Form.Item>
			<Form.Item
				label="size"
				name="size"
				rules={[
					{
						required: true,
						message: 'Please input your size!',
					},
				]}
			>
				<InputNumber placeholder="Type a message..." size="large" />
			</Form.Item>
			<Button type="primary" htmlType="submit">
				Find a Group
								</Button>
		</Form>
	);

	return (
		<div id="group-list-container">
				<Row id="group-list-header" align="middle">
					<h1 style={{margin: "0px"}}>Groups</h1>
					<Popover placement="bottomLeft" content={content} trigger="click">
						<Button>Join</Button>
					</Popover>
				</Row>
				<div id="group-list">
					{(groups.length > 0) ? groups.slice(0).reverse().map((curr) => (
						<Link to={`/groups/${curr.gid}`} >
							<Row className={`group-list-item ${(curr.gid === group) ? "is-selected" : null}`} align="middle">
								{curr.name}
							</Row>
						</Link>
					)) : <Row style={{height: "100%"}} justify="center" align="middle"><p>You have no groups</p></Row>}
				</div>
			</div>
	)
}

function GroupChat(props) {
	const data = props.data;
	const group = props.group;

	const [form] = Form.useForm();

	const [
		sendMessage,
		{ loading: mutationLoading, error: mutationError }
	] = useMutation(SEND_MESSAGE);

	const submitMessage = (values) => {
		sendMessage({ variables: { uid: data.user.uid, gid: group.gid, content: values.message } });
		form.resetFields();
	}

	return (
		<div id="group-chat-container">
				{(!!group) ? (<>
					<Row id="group-chat-header" align="middle">
						<h1>
							{group.name}
						</h1>
					</Row>
					<div id="group-chat">
						{(!!group) ? group.messages.slice(0).reverse().map((message) => (<Row className="chat-message" align="middle">
							<span className="message-author">{message.sender.username}</span>
							<span className={`message-content ${(message.sender.username === data.user.username) ? "author-is-user" : null}`}>{message.content}</span>
						</Row>)) : null}

					</div>
					<div id="chat-text-box">
						<Form form={form} name="basic" onFinish={submitMessage} onFinishFailed={() => (null)} initialValues={{
							remember: true,
						}}>
							<Form.Item
								label="message"
								name="message"
								rules={[
									{
										required: true,
										message: 'Please input your message!',
									},
								]}
							>
								<Input autoComplete="off" placeholder="Type a message..." size="large" />
							</Form.Item>
						</Form>
					</div></>) : <Row style={{height: "100%"}} justify="center" align="middle">
						<h1 style={{color: "#dbdbdb"}}>Select a group</h1>
					</Row>

				}
			</div>
	)
}

function Content(props) {

	const username = localStorage.getItem('username');

	const group = props.group;

	const { loading, error, data } = useQuery(USER, {
		variables: { username },
		pollInterval: 200,
	});

	if (error) { return (<div>Error</div>); }
	if (loading) { return (<div>Loading...</div>); }

	const currGroup = (group) ? data.user.groups.find(curr => curr.gid === group) : null;

	if (!!group && !!currGroup === false) { return (<Redirect to={'/groups'} />) }

	return (
		<div id="groups">
			<GroupList
				data={data}
				groups={data.user.groups}
				group={group}
			  />	
			<GroupChat
				data={data}
				group={currGroup}
			  />
		</div>
	);
}

function Groups(props) {
	return (
		<Page
			page="groups"
			noFooter={true}
			content={<Content group={props.match.params.group} />}
		/>
	);
}

export default Groups;
