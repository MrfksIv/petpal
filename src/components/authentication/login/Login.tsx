import React, {Component, FormEvent} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Route, Link } from 'react-router-dom';
import {FormComponentProps} from 'antd/lib/form';
import {RegisterForm} from '../register/Register';

interface LoginProps extends FormComponentProps {
    usernameEmail: string;
    password: string;
}

interface LoginState {

}

class Login extends Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);
    }

    private handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();
        this.props.form.validateFields( (err, values) => {
            if (!err) {
                console.log('LOGIN CREDS:', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <h1>
                    Sign in
                </h1>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label='Username/Email'>
                        {getFieldDecorator('usernameEmail', {
                            rules: [{required: true, message: 'Input your username or email!'}]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25'}}/>}
                                placeholder="giannakis@example.com"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label={<span><span>Password</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <Link to='/forgot-password' style={{float: 'right' }}> Forgot password</Link></span>}>

                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Input your password!'}]
                        })(

                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25'}}/>}
                                type="password"
                                placeholder="••••••••"
                            />
                        )}

                    </Form.Item>
                    <Form.Item style={{textAlign: 'center'}}>
                        <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                            Log in
                        </Button>
                        Don't have an account? <Link to='/register'>Register now!</Link>
                    </Form.Item>
                </Form>
            </div>

        );
    }
}

export const LoginForm = Form.create({name: 'main_login'})(Login);
