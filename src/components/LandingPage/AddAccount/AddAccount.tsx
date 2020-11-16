import React from 'react';
import {DatePicker, Divider, Form, Input, Select, Space, Tooltip} from 'antd';
import AvatarUpload from '../AvatarUpload';
import {InfoCircleOutlined, UserOutlined} from '@ant-design/icons';
import {useMutation} from '@apollo/client';
import gql from "graphql-tag";
import {upsertUserAccount} from '../../../graphql/mutations';
import {useTranslation} from 'react-i18next';
import {FormInstance} from 'antd/lib/form/hooks/useForm';

const { Option } = Select;


interface AddAccountProps {
    moveToNextStep: () => void;
    form: FormInstance;
}
const AddAccount: React.FC<AddAccountProps> = (props) => {

    const { moveToNextStep, form } = props;
    const [createAccount, { data }] = useMutation(gql(upsertUserAccount));
    const { t } = useTranslation();

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        const { fullName, phone, address } = values;
        console.log(fullName, phone, address)
        try {
            const res = await createAccount({
                variables: {
                    fullName: fullName,
                    username: 'unnecessary',
                    mobile: phone.extension + phone.number,
                    countryCity: `Cyprus:${address.city}`,
                    fullAddress: `Cyprus:${address.city}:${address.postCode}:${address.street}`,
                    input: {
                        fullName: fullName,
                        username: 'unnecessary',
                        mobile: phone.extension + phone.number,
                        countryCity: `Cyprus:${address.city}`,
                        fullAddress: `Cyprus:${address.city}:${address.postCode}:${address.street}`,
                    }
                }
            });

            console.log('CREATED ACCOUNT:', res);
        } catch (e) {
            console.log('ERROR WHILE CREATING:', e);
        }
        moveToNextStep();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('onFinishFailed:', errorInfo)
    }

    return (
        <Form form={form} size='large' onFinish={onFinish} onFinishFailed={onFinishFailed} layout='vertical'>
            <div className='steps-content' style={{padding: '2em 0 0'}}>
                <Space direction='vertical' style={{width: '100%'}} size='middle'>
                    <Divider orientation='left' className='themed-divider'>Personal Info</Divider>
                    <AvatarUpload />
                    <Form.Item name='fullName' rules={[ {required: true, message: 'Required field' }]}>
                        <Input
                            placeholder={t('newAccountName.placeholder')}
                            prefix={<UserOutlined className="primary-color site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Extra information">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </Form.Item>
                    <Form.Item name='dob' rules={[ {required: true, message: 'Required field' }]}>
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item>
                        <Input.Group compact>
                            <Form.Item initialValue='+357' noStyle name={['phone', 'extension']}>
                                <Select>
                                    <Option value="+357">+357</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item noStyle name={['phone', 'number']}>
                                <Input style={{ width: '50%' }} placeholder="9X XXXXXX" />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                    <Divider orientation='left' className='themed-divider'>Address</Divider>

                    <Form.Item>
                        <Space direction='vertical' style={{width: '100%'}} size='middle'>
                            <Form.Item name={['address', 'street']}>
                                <Input style={{ width: '50%' }} placeholder={t('newAccountAddress.placeholder')} />
                            </Form.Item>

                            <Form.Item noStyle>
                                <Input.Group>
                                    <Space direction='horizontal' style={{width: '100%'}}>
                                        <Form.Item name={['address', 'postCode']}>
                                            <Input placeholder={t('newAccountPostCode.placeholder')} />
                                        </Form.Item>
                                        <Form.Item  name={['address', 'city']}>
                                            <Input placeholder={t('newAccountCity.placeholder')} />
                                        </Form.Item>
                                    </Space>
                                </Input.Group>
                            </Form.Item>
                        </Space>
                    </Form.Item>
                </Space>
            </div>
            <div className="steps-action">
                <Divider style={{marginTop: 0}} />
            </div>
        </Form>
    )
}

export default AddAccount;
