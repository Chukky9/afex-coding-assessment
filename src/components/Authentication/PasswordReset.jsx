import React, { Fragment, useReducer, useEffect, useState, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Input } from 'antd';
import { createUseStyles } from 'react-jss';
import { formReducer } from '../../utils/helpers';
import { useFormStyles } from '../CustomStyles';
import AuthenticationService from '../../services/AuthenticationService';
import { alert } from '../../utils/alerts';

const { passwordReset, passwordResetOtpValidation } = AuthenticationService()

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
    },
    alerts:  {
        textAlign: 'initial',
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
    const [validated, setValidated] = useState(true)
    let mounted = useRef(true)

    const handleInput = event => {
        setResetPasswordData({
            name: event.target.name,
            value: event.target.value
        })
    }

    const handleProceed = async () => {
        if (!resetPasswordData.email) {
            setValidated(false)
            return;
        } else {
            setValidated(true)
        }
        console.log(resetPasswordData)
        const emailConfirmResponse = await passwordReset(resetPasswordData)
        console.log('response from inside component', emailConfirmResponse)
        if (mounted.current) {
            if (!emailConfirmResponse || (emailConfirmResponse && emailConfirmResponse.responseCode !== '100')) {
                alert("Error verifying email", 'danger')
            } else {
                navigate("/sign-in/password-reset/otp-validation", { state: { email: resetPasswordData?.email ?? null }})
            }
        }
    }

    const goBack = event => {
        event.preventDefault()
        navigate(-1)
    }

    useEffect(() => {
        mounted.current = true

        return () => mounted.current = false
    })

    return (
        <Fragment>
            <div className={formClasses.formDiv}>
                <div className={formClasses.formGroup}>
                    <label htmlFor='email'>Enter the Email Address you registered with</label>
                    <Input id='email' name='email' placeholder='Enter your Email' type='email'
                        required value={resetPasswordData.email || ''} onChange={handleInput}
                        status={(!validated && (!resetPasswordData.email || (resetPasswordData.email && !resetPasswordData.email.includes('@')))) ? 'error' : undefined}/>
                    { (!validated && (!resetPasswordData.email || (resetPasswordData.email && !resetPasswordData.email.includes('@')))) && <small className={classes.alerts}>Enter a valid email</small>}
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
    const [validated, setValidated] = useState(true)
    let mounted = useRef(true)

    const handleInput = event => {
        setResetPasswordData({
            name: event.target.name,
            value: event.target.value
        })
    }

    const handleFinish = async () => {
        if (!resetPasswordData.email) {
            setValidated(false)
            return;
        } else {
            setValidated(true)
        }
        console.log(resetPasswordData)
        let data = { ...resetPasswordData, email: state.email }
        const otpValidationResponse = await passwordResetOtpValidation(data)
        console.log('response from inside component', otpValidationResponse)
        if (mounted.current) {
            if (!otpValidationResponse || (otpValidationResponse && otpValidationResponse.responseCode !== '100')) {
                alert('Error processing OTP', 'danger')
            } else {
                navigate('/sign-in')
            }
        }
    }

    const goBack = () => {
        navigate(-1)
    }

    const resendOtp = () => {}

    useEffect(() => {
        mounted.current = true

        if (!state?.email) {
            navigate('/sign-in')
        }

        return () => mounted.current = false
    }, [state])

    return (
        <Fragment>
            <div className={formClasses.formDiv}>
                <div className={formClasses.formGroup}>
                    <label htmlFor='otp'>Enter the 4-digit code that was sent to { (state && state.email) ? state.email : 'name@mymail.com' }</label>
                    <Input id='otp' name='otp' placeholder='Enter Code'
                        required value={resetPasswordData.otp || ''} onChange={handleInput}
                        status={(!validated && !resetPasswordData.otp) ?  'error' : undefined}/>
                    { (!validated && !resetPasswordData.otp) && <small className={classes.alerts}>This field is required</small>}
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