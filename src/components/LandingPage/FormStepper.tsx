import {Button, Row} from 'antd';
import React from 'react';
import {FormInstance} from 'antd/lib/form/hooks/useForm';

interface FormStepperInterface {
    currentStep: number;
    totalSteps: number;
    previousStep: () => void;
    form?: FormInstance
}
const FormStepper: React.FC<FormStepperInterface> = (props) => {

    const { currentStep, previousStep, totalSteps, form } = props;

    const submitForm = () => {
        console.log('FFF', form)
        form && form.submit();
    }
    console.log('currentStep:', currentStep);
    return (
        <Row justify='end'>
            {currentStep > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => previousStep()}>
                    Previous
                </Button>
            )}
            {currentStep < totalSteps && (
                <Button type="primary" htmlType='submit' onClick={submitForm}>
                    Next
                </Button>
            )}
        </Row>
    )
}

export default FormStepper;
