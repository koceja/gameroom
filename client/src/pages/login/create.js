import React from 'react';
import { Row, Col, Card, Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { gql, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';

const USER = gql`
  query user {
    user(username: "daniel") {
      username
      password
    }
  }
`;


const CREATE_ACCOUNT = gql`
  mutation createAccount($username: String!, $password: String!) {
    createAccount(username: $username, password: $password) {
      username
      password
    }
  }
`;


const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 18,
    },
};

const interests = ['spirituality', 'baking', 'golf', 'gardening', 'surfing', 'sports', 'photography', 'astrology', 'vlogging', 'writing', 'picnicking', 'running', 'cooking', 'disney', 'art', 'pets', 'instagram', 'board games', 'movies', 'exercise', 'museums', 'languages', 'food', 'blogging', 'hiking', 'volunteering', 'dancing', 'climbing', 'tea', 'comedy', 'politics', 'brunch', 'fishing'];

const Create = () => {
    const { loading, error, data } = useQuery(USER);
    if (!loading) {console.log(data);}
    const [
        createAccount,
        { loading: mutationLoading, error: mutationError }
      ] = useMutation(CREATE_ACCOUNT);
    const onFinish = (values) => {
        createAccount({variables: {username: values.username, password: values.password}});
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        
        <Row style={{ height: "100vh", backgroundColor: "#d9d9d9" }} align="middle">
            <Button onClick={() => {createAccount({variables: {username: "daniel-1", password: "password"}})}}>Create</Button>
            <Col xs={{ span: 20, offset: 2 }} sm={{ span: 20, offset: 2 }} md={{ span: 16, offset: 4 }} lg={{ span: 14, offset: 5 }} xl={{ span: 10, offset: 7 }} xxl={{ span: 8, offset: 8 }}>
                <Card>
                    <Link to="/">
                        <img style={{width: "100%"}} src={logo} alt="logo" />
                    </Link>                    <br />
                    <br />

                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="interests" label="Interests" rules={[
                            {
                                required: true,
                                message: 'Please select some interests!'
                            }
                        ]}>
                            <Checkbox.Group>
                                <Row>
                                    {interests.map((interest) => (<Col span={8}>
                                        <Checkbox value={`${interest}`} style={{ lineHeight: '32px' }}>
                                            {interest}</Checkbox>
                                    </Col>))}
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Create Account
                            </Button>
                            <span>&emsp;</span>
                            <Link to='/login' >
                                <Button type="primary">
                                    Back To Login
                                </Button>
                            </Link>
                        </Form.Item>
                    </Form>
                    {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error :( Please try again</p>}
                </Card>
            </Col>
        </Row>


    );
};

export default Create;