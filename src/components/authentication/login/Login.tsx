import React, {Component, FormEvent} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Route, Link } from 'react-router-dom';
import {FormComponentProps} from 'antd/lib/form';
import {Title} from "../../Title";
import {AuthStyles} from "../general-styles";
import GoogleLogin from 'react-google-login';

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

    public responseGoogle = (response: any) => {
        console.log(response);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Title></Title>
                <h1 style={AuthStyles.h1Style}>
                    Sign in
                </h1>
                <div style={AuthStyles.formContainer}>
                    <Form onSubmit={this.handleSubmit} className="login-form" style={AuthStyles.formStyle}>
                        <Form.Item label='Username/Email'>
                            {getFieldDecorator('usernameEmail', {
                                rules: [{required: true, message: 'Input your username or email!'}]
                            })(
                                <Input
                                    prefix={<Icon type="user" style={AuthStyles.inputStyle}/>}
                                    placeholder="giannakis@example.com"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label={<span><span>Password</span> <Link to='/forgot-password' style={{display: 'inline-block', marginLeft: '50px', float: 'right' }}> Forgot password</Link></span>}>

                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Input your password!'}]
                            })(

                                <Input
                                    prefix={<Icon type="lock" style={AuthStyles.inputStyle}/>}
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
                <div style={AuthStyles.formContainer}>
                    <GoogleLogin
                        clientId="162096347598-eov26og5dif8for0an3sc114o9cl5321.apps.googleusercontent.com"
                        buttonText="Or Login with Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>

            </div>

        );
    }
}

export const LoginForm = Form.create({name: 'main_login'})(Login);
