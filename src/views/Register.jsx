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
        '@media (max-width: 1024px)': {
            width: '70%'
        },
        '@media (max-width: 768px)': {
            width: '80%',
            padding: '0.3em'
        },
        '@media (max-width: 420px)': {
            width: '95%'
        },
        '@media (max-width: 320px)': {
            width: '100%',
        }
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
        margin: '1em 0',
        '& div': {
            width: '100%',
            '& div': {
                width: '25%',
            }
        }
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
                <Steps progressDot current={currentStep} className={classes.steps} responsive={false}>
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