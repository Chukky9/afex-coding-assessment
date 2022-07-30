import React, { useState, useReducer } from 'react';
import { Steps } from 'antd';
import { Outlet } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { userReducer } from '../utils/helpers';

const { Step } = Steps;

const useStyles = createUseStyles({
    wrapper: {
        width: '40%',
        padding: '1em',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    steps: {
        '& .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot': {
            background: 'var(--red) !important'
        },
        '& .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot': {
            background: 'var(--red) !important'
        },
        '& .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after': {
            background: 'var(--red) !important'
        }
    },
    stepsDiv: {
        margin: '1em 0'
    },
    small: {
        textAlign: 'center',
        margin: '10px 0',
        fontSize: 'small',
    }
})

const Register = () => {
    const classes = useStyles()
    const [userData, setUserData] = useReducer(userReducer, {})
    const [currentStep, setCurrentStep] = useState(0)

    return (
        <div className={classes.wrapper}>
            <div className='custom-card'>
                <Outlet context={{ step: [currentStep, setCurrentStep], user: [userData, setUserData]}}/>
            </div>

            <small className={classes.small}>
                { currentStep + 1}/4
            </small>

            <div className={classes.stepsDiv}>
                <Steps progressDot current={currentStep} className={classes.steps}>
                    <Step title=''></Step>
                    <Step title=''></Step>
                    <Step title=''></Step>
                    <Step title=''></Step>
                </Steps>
            </div>
        </div>
    );
}
 
export default Register;