import React from 'react';
import { Row, Col, Card, Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { gql, useQuery } from '@apollo/client';

const ACTIVATE_ACCOUNT = gql`
  mutation GetDogs {
    dogs {
      id
      breed
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

const Login = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row style={{height: "100vh", backgroundColor: "#d9d9d9"}} align="middle">
            <Col xs={{span: 20, offset: 2}} sm={{span: 20, offset: 2}} md={{span: 16, offset: 4}} lg={{span: 14, offset: 5}} xl={{span: 10, offset: 7}} xxl={{span: 8, offset: 8}}>
                <Card style={{minWidth: "400px"}}>
                    <Link to="/">
                        <img style={{width: "100%"}} src={logo} alt="logo" />
                    </Link>
                    <br />
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

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                            <span>&emsp;</span>
                            <Link to ='/create' >
                                <Button type="primary">
                                    Create Account
                                </Button>
                            </Link>
                            
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>


    );
};

export default Login;