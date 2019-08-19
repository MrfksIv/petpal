import React, {ChangeEvent, Component, FormEvent} from 'react';
import {Button, Form, Icon, Input, Tooltip} from 'antd';
import {FormComponentProps, ValidationRule} from 'antd/lib/form';

import styles from './register.module.css';
import {Title} from "../../Title";
import {AuthStyles} from "../general-styles";
import {Link} from "react-router-dom";


interface RegisterProps extends FormComponentProps {

}

interface RegisterState {
    confirmDirty: boolean;
}

class Register extends Component<RegisterProps, RegisterState> {

    constructor(props: RegisterProps) {
        super(props);

        this.state = {
            confirmDirty: false
        }
    }

    handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        })
    };

    handlePasswordBlur = (evt: ChangeEvent<HTMLInputElement>) => {
        const { value } = evt.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    validatePasswordStrength = (rule: ValidationRule, password: string, callback: (result?: string) => void) => {
        const hasLetters = /[a-zA-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasNonalphas = /\W/.test(password);
        console.log('CALLED:', hasNonalphas, hasNumbers, hasLetters);
        if ( password.length < 8) {
            callback('Invalid Password');
        } else if ( !hasLetters || !hasNumbers || !hasNonalphas) {
            callback('Invalid Password');
        } else {
            callback();
        }
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        const mobilePrefixSelector = getFieldDecorator('prefix', {

        });

        return (
            <div>
                <Title></Title>
                <h1 style={AuthStyles.h1Style}> Register</h1>
                <div style={AuthStyles.formContainer}>
                    <Form style={AuthStyles.formStyle}>
                        <Form.Item label="Email">
                            {getFieldDecorator('email', {
                                rules: [
                                    {type: 'email', message: 'Please enter your email'},
                                    {required: true, message: 'Please enter your email'}
                                ]
                            })(<Input prefix={<Icon type="mail"/>} placeholder="giannakis@example.com" />)}
                        </Form.Item>
                        <Form.Item label="Username">
                            {getFieldDecorator('username', {
                                rules: [
                                    {required: true, message: 'Please enter a unique email'}
                                ]
                            })(<Input prefix={<Icon type="user"/>} placeholder="giannakis" />) }
                        </Form.Item>
                        <Form.Item label={
                            <span>
                                Password&nbsp;
                                <Tooltip title="Password must be 8 characters long and contain numbers, letters and symbols">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        } hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [
                                    {validator: this.validatePasswordStrength}
                                ]
                            })(<Input.Password
                                prefix={<Icon type="lock"/>}
                                onBlur={this.handlePasswordBlur}
                                placeholder="••••••••"

                            />)}
                        </Form.Item>
                        <Form.Item style={{textAlign: 'center'}}>
                            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                Join
                            </Button>
                            <Link to='/login'>Back to Login</Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>

        );
    }
}

export const RegisterForm = Form.create({name: 'app_register'})(Register);

