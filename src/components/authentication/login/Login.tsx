import React, {Component, FunctionComponent, FormEvent} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Route, Link } from 'react-router-dom';
import {FormComponentProps} from 'antd/lib/form';
import {Title} from "../../Title";
import {AuthStyles} from "../general-styles";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import { useTranslation } from 'react-i18next'
import * as i18next from 'i18next';

interface LoginProps extends FormComponentProps {
    usernameEmail: string;
    password: string;
    t:  i18next.TFunction
}

interface LoginState {

}

const Login: FunctionComponent<LoginProps> = (props) => {

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();
        props.form.validateFields( (err, values) => {
            if (!err) {
                console.log('LOGIN CREDS:', values);
            }
        });
    };

    const responseGoogle = (response: any) => {
        console.log(response);
    };

    const responseFacebook = (response: any) => {
        console.log(response);
    };

    const fbLoginClicked = () => {
        console.log('clicked!');
    };

    const { getFieldDecorator } = props.form;
    const { t } = useTranslation();

    return (

        <div>
            <Title></Title>
            <h1 style={AuthStyles.h1Style}>
                {t('signin.header')}
            </h1>
            <div style={AuthStyles.formContainer}>
                <Form onSubmit={handleSubmit} className="login-form" style={AuthStyles.formStyle}>

                    <Form.Item label='Username/Email'>
                        {getFieldDecorator('usernameEmail', {
                            rules: [{required: true, message: t('usernameOrEmail.wrongField')}]
                        })(
                            <Input
                                prefix={<Icon type="user" style={AuthStyles.inputStyle}/>}
                                placeholder="giannakis@example.com"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item label={<span><span>{t('password.label')}</span></span>}>

                        {getFieldDecorator('password', {
                            rules: [{required: true, message: t('password.required')}]
                        })(

                            <Input
                                prefix={<Icon type="lock" style={AuthStyles.inputStyle}/>}
                                type="password"
                                placeholder="••••••••"
                            />

                        )}
                    </Form.Item>

                    <Form.Item style={{marginTop: '-35px'}}>
                        <Link to='/forgot-password' style={{display: 'inline-block', marginLeft: '50px', float: 'right' }}>{t('forgotPassword.link')}</Link>
                    </Form.Item>

                    <Form.Item style={{textAlign: 'center'}}>
                        <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                            {t('signin.button')}
                        </Button>
                        {t('noAccount')} <Link to='/register'>{t('register.link')}</Link>

                    </Form.Item>

                </Form>
            </div>
            <div style={AuthStyles.formContainer}>
                <GoogleLogin
                    clientId="162096347598-eov26og5dif8for0an3sc114o9cl5321.apps.googleusercontent.com"
                    buttonText={t('googleSignin')}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <FacebookLogin
                    size="small"
                    appId="1088597931155576"
                    textButton={t('fbSignin')}
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={responseFacebook} />
            </div>

        </div>

    );
}

export const LoginForm = Form.create({name: 'main_login'})(Login);
