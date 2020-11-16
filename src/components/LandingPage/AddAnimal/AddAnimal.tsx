import React from 'react';
import { Form, Input, Space, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import gql from "graphql-tag";
import { putPets } from '../../../graphql/mutations';
import {FormInstance} from 'antd/lib/form/hooks/useForm';

interface AddAccountProps {
    moveToNextStep: () => void;
    form: FormInstance;
}
const AddAnimal: React.FC<AddAccountProps> = (props) => {
    const [createPets, { data }] = useMutation(gql(putPets));
    const { form, moveToNextStep } = props;
    const onFinish = async (values: any) => {
        console.log('Received values of form:', values);

        try {
            const res = await createPets({
                variables: {input: values.animals}}
            );
            console.log('CREATED PETS:', res);
            moveToNextStep();
        } catch (e) {
            console.log('An error occurred when putting pets:', e);
        }
    }

    return (
        <Form form={form} name='add_animal_form' onFinish={onFinish} autoComplete='off'>
            <Form.List name='animals'>
                {(fields, { add, remove }) => (
                    <>
                        {fields.map((field) => (
                            <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'name']}
                                    fieldKey={[field.fieldKey, 'name']}
                                    rules={[{ required: true, message: 'Missing pet name' }]}
                                >
                                    <Input placeholder="Pet Name" />
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'animalType']}
                                    fieldKey={[field.fieldKey, 'animalType']}
                                    rules={[{ required: true, message: 'Missing animal kind' }]}
                                >
                                    <Input placeholder="Animal Kind" />
                                </Form.Item>

                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add field
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form>
    )
}

export default AddAnimal;
