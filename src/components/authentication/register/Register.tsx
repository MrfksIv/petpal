import React, {ChangeEvent, Component, FormEvent} from 'react';
import {Form, Icon, Input} from 'antd';
import {FormComponentProps, ValidationRule} from 'antd/lib/form';

import styles from './register.module.css';


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
        if ( password.length < 8) {
            callback('Password must be at least 8 characters long');
        } else if ( !hasLetters || !hasNumbers || !hasNonalphas) {
            callback('Password must contain numbers, letters and symbols');
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
                <h1> Register </h1>
                <Form>
                    <Form.Item label="Email" className={styles.inputField}>
                        {getFieldDecorator('email', {
                            rules: [
                                {type: 'email', message: 'Please enter your email'},
                                {required: true, message: 'Please enter your email'}
                            ]
                        })(<Input className={styles.inputField} prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25'}}/>}/>)}
                    </Form.Item>
                    <Form.Item label="Username">
                        {getFieldDecorator('username', {
                            rules: [
                                {required: true, message: 'Please enter a unique email'}
                            ]
                        })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25'}}/>} />)}
                    </Form.Item>
                    <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {required: true, message: 'Please enter a valid password'},
                                {validator: this.validatePasswordStrength}
                            ]
                        })(<Input.Password
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25'}}/>}
                            onBlur={this.handlePasswordBlur}

                        />)}
                    </Form.Item>
                </Form>
            </div>

        );
    }
}

export const RegisterForm = Form.create({name: 'app_register'})(Register);

