import React, { Fragment, useReducer, useEffect } from 'react';
import { NavLink, useOutletContext, useNavigate } from 'react-router-dom';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import { useFormStyles, useRegistrationStyles } from '../CustomStyles';
import { formReducer } from '../../utils/helpers';

const { Option } = Select

export const IndividualBasicInformation = () => {
    const navigate = useNavigate()
    const classes = useRegistrationStyles()
    const formClasses = useFormStyles()
    const [formData, setFormData] = useReducer(formReducer, {})
    const { step, user } = useOutletContext()
    const [currentStep, setCurrentStep] = step ?? []
    const [, setUserData] = user ?? []

    useEffect(() => {
        if (currentStep !== 0) {
            setCurrentStep(0)
        }
    })

    const navStyles = ({ isActive }) => ({
        background: isActive ? 'var(--black)' : 'var(--white)',
        color: isActive ? 'var(--white)' : 'var(--black)',
        border: isActive ? '1px solid var(--black)' : '1px solid var(--grey)'
    })

    const handleInput = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        })
    }

    const proceedToNextStep = () => {
        setUserData(formData)
        setCurrentStep(currentStep + 1)
        navigate('/register/individual/login-details')
    }

    return (
        <Fragment>
            <h4>Register new account</h4>
            <small>Sign up for an account and start trading today</small>

            <div className={formClasses.formDiv} style={{ marginTop: '1.5em' }}>
                <div className={formClasses.formGroup}>
                    <label>Select select the category that best describes you</label>
                    <div className={classes.linkDiv}>
                        <NavLink to='/register/individual/basic-information' className={classes.links} style={navStyles}>
                            Individual
                        </NavLink>
                        <NavLink to='/register/corporate/company-information' className={classes.links} style={navStyles}>
                            Corporate
                        </NavLink>
                    </div>
                </div>

                <div className={formClasses.formLine}>
                    <div className={`${formClasses.formGroup} ${classes.halfInput}`}>
                        <label htmlFor='firstname'>Your First Name</label>
                        <Input id='firstname' name='firstname' placeholder='Enter your First Name'
                            required value={formData.firstname || ''} onChange={handleInput}/>
                    </div>

                    <div className={`${formClasses.formGroup} ${classes.halfInput}`}>
                    <label htmlFor='lastname'>Your Last Name</label>
                        <Input id='lastname' name='lastname' placeholder='Enter your Last Name'
                            required value={formData.lastname || ''} onChange={handleInput}/>
                    </div>
                </div>

                <div className={formClasses.formGroup}>
                    <label htmlFor='email'>Your Email</label>
                    <Input id='email' name='email' placeholder='Enter your Email' type='email'
                        required value={formData.email || ''} onChange={handleInput}/>
                </div>
            </div>

            <button className={classes.button} onClick={proceedToNextStep}>NEXT STEP</button>
        </Fragment>
    )
}

export const IndividualLoginDetails = () => {
    const navigate = useNavigate()
    const classes = useRegistrationStyles()
    const formClasses = useFormStyles()
    const [formData, setFormData] = useReducer(formReducer, {})
    const { step, user } = useOutletContext()
    const [currentStep, setCurrentStep] = step ?? []
    const [, setUserData] = user ?? []
    
    useEffect(() => {
        if (currentStep !== 1) {
            setCurrentStep(1)
        }
    })

    const handleInput = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        })
    }

    const verifyAccount = () => {
        console.log(formData)
        setUserData(formData)
        setCurrentStep(currentStep + 1)
        navigate('/register/individual/otp-verification')
    }

    return (
        <Fragment>
            <h4>Register new account</h4>
            <small>Sign up for an account and start trading today</small>

            <div className={formClasses.formDiv} style={{ marginTop: '1.5em' }}>
                <div className={formClasses.formGroup}>
                    <label htmlFor='password'>Password</label>
                    <Input.Password id='password' name='password' placeholder='Enter your Password'
                        required value={formData.password || ''} onChange={handleInput}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                </div>

                <div className={formClasses.formGroup}>
                    <label htmlFor='confirm_password'>Confirm Password</label>
                    <Input.Password id='confirm_password' name='confirm_password' placeholder='Confirm Password'
                        required value={formData.confirm_password || ''} onChange={handleInput}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                </div>

                <div className={formClasses.formGroup}>
                    <label htmlFor='phone'>Phone Number</label>
                    <div className={formClasses.formLine}>
                        <Select id='phone_code' name='phone_code' label="Phone Code" style={{ width: '20%' }}
                            defaultValue='+234' value={formData.phone_code || undefined}
                            onChange={event => handleInput({
                                target: {
                                    name: 'phone_code',
                                    type: 'change',
                                    value: event
                                }
                            })}>
                            <Option value='+234'>+234</Option>
                        </Select>

                        <Input id='phone' name='phone' placeholder='Enter your phone number'
                            required value={formData.phone || ''} onChange={handleInput}
                            type='number' style={{ width: '75%' }}/>
                    </div>
                </div>
            </div>

            <button className={classes.button} onClick={verifyAccount}>VERIFY ACCOUNT</button>
        </Fragment>
    )
}

export const IndividualOtpValidation = () => {
    const navigate = useNavigate()
    const classes = useRegistrationStyles()
    const formClasses = useFormStyles()
    const [formData, setFormData] = useReducer(formReducer, {})
    const { step, user } = useOutletContext()
    const [currentStep, setCurrentStep] = step ?? []
    const [userData, setUserData] = user ?? []

    useEffect(() => {
        if (currentStep !== 2) {
            setCurrentStep(2)
        }
    })

    const handleInput = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        })
    }

    const goBack = () => {
        navigate(-1)
    }

    const resendOtp = () => {}

    const handleFinish = event => {
        event.preventDefault()
        console.log(formData)
        if (!formData.otp) {
            alert('Please put a valid OTP')
            return;
        }
        setUserData(formData)
        setCurrentStep(currentStep + 1)
        navigate('/register/individual/registration-successful')
    }

    return (
        <Fragment>
            <h4>Account details</h4>
            <small>Sign up for an account and start trading today</small>

            <div className={formClasses.formDiv} style={{ marginTop: '1.5em' }}>
                <div className={formClasses.formGroup}>
                    <label htmlFor='otp'>
                        Enter the 4-digit code that was sent to { (userData.phone) ? `${'+234' + userData.phone} and` : ''} { userData.email || 'name@mymail.com' }
                    </label>
                    <Input id='otp' name='otp' placeholder='Enter Code'
                        required value={formData.otp || ''} onChange={handleInput}/>
                    <span role='button' onClick={resendOtp}>
                        <small className={classes.small}>Resend Code</small>
                    </span>
                </div>
            </div>

            <div className={formClasses.formLine}>
                <button className={classes.button} style={{ color: 'var(--black)' }} onClick={goBack}>BACK</button>
                <button className={classes.button} onClick={handleFinish}>FINISH</button>
            </div>
        </Fragment>
    )
}