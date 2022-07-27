import React, { Fragment, useReducer, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Input } from 'antd';
import { createUseStyles } from 'react-jss';
import { formReducer } from '../../utils/helpers';
import { useFormStyles } from '../CustomStyles';

const useStyles = createUseStyles({
    small: {
        color: 'var(--grey)',
        margin: '0.5em'
    },
    button: {
        background: 'none',
        padding: '0.5em',
        fontWeight: 600,
        border: 'none'
    },
    proceedButton: {
        color: 'var(--red)'
    }
})

const PasswordReset = () => {
    
    return (
        <Fragment>
            <h4>Password Reset</h4>
            <small>Reset your password to continue trading on ComX</small>

            <Outlet/>
        </Fragment>
    );
}
 
export default PasswordReset;

export const ResetForm = () => {
    const navigate = useNavigate()
    const classes = useStyles()
    const formClasses = useFormStyles()
    const [resetPasswordData, setResetPasswordData] = useReducer(formReducer, {})

    const handleInput = event => {
        setResetPasswordData({
            name: event.target.name,
            value: event.target.value
        })
    }

    const handleProceed = event => {
        event.preventDefault()
        console.log(resetPasswordData)
        if (!resetPasswordData.email) {
            alert('Please put a valid email')
            return;
        }
        navigate("/sign-in/password-reset/otp-validation", { state: { email: resetPasswordData?.email ?? null }})
    }

    const goBack = event => {
        event.preventDefault()
        navigate(-1)
    }

    return (
        <Fragment>
            <div className={formClasses.formDiv}>
                <div className={formClasses.formGroup}>
                    <label htmlFor='email'>Enter the Email Address you registered with</label>
                    <Input id='email' name='email' placeholder='Enter your Email' type='email'
                        required value={resetPasswordData.email || ''} onChange={handleInput}/>
                    <small className={classes.small}>Note that you'll be sent an OTP to the email address provided</small>
                </div>
            </div>

            <div className={formClasses.formLine}>
                <button className={classes.button} onClick={goBack}>BACK</button>
                <button className={`${classes.button} ${classes.proceedButton}`} onClick={handleProceed}>PROCEED</button>
            </div>
        </Fragment>
    )
}

export const OtpValidation = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const classes = useStyles()
    const formClasses = useFormStyles()
    const [resetPasswordData, setResetPasswordData] = useReducer(formReducer, {})

    useEffect(() => {
        if (!state?.email) {
            navigate('/sign-in')
        }
    }, [state])

    const handleInput = event => {
        event.preventDefault()
        setResetPasswordData({
            name: event.target.name,
            value: event.target.value
        })
    }

    const handleFinish = event => {
        event.preventDefault()
        console.log(resetPasswordData)
        if (!resetPasswordData.otp) {
            alert('Please put a valid OTP')
            return;
        }
        navigate('/sign-in')
    }

    const goBack = () => {
        navigate(-1)
    }

    const resendOtp = () => {}

    return (
        <Fragment>
            <div className={formClasses.formDiv}>
                <div className={formClasses.formGroup}>
                    <label htmlFor='otp'>Enter the 4-digit code that was sent to { (state && state.email) ? state.email : 'name@mymail.com' }</label>
                    <Input id='otp' name='otp' placeholder='Enter Code'
                        required value={resetPasswordData.otp || ''} onChange={handleInput}/>
                    <span role='button' onClick={resendOtp}>
                        <small className={classes.small}>Resend Code</small>
                    </span>
                </div>
            </div>

            <div className={formClasses.formLine}>
                <button className={classes.button} onClick={goBack}>BACK</button>
                <button className={`${classes.button} ${classes.proceedButton}`} onClick={handleFinish}>FINISH</button>
            </div>
        </Fragment>
    )
}