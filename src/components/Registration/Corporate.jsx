import React, { Fragment, useReducer, useEffect } from 'react';
import { NavLink, useOutletContext, useNavigate } from 'react-router-dom';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import { useFormStyles, useRegistrationStyles } from '../CustomStyles';
import { formReducer } from '../../utils/helpers';

const { Option } = Select

export const CorporateCompanyInformation = () => {
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
        navigate('/register/corporate/login-details')
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

                <div className={formClasses.formGroup}>
                    <label htmlFor='company_name'>Company Name</label>
                    <Input id='company_name' name='company_name' placeholder='Enter Company Name'
                        required value={formData.company_name || ''} onChange={handleInput}/>
                </div>

                <div className={formClasses.formLine}>
                    <div className={`${formClasses.formGroup} ${classes.halfInput}`}>
                        <label htmlFor='business_type'>Type of Business</label>
                        <Select id='business_type' name='business_type' placeholder='Select Type of Business'
                            label="Type of Business" value={formData.business_type || undefined}
                            onChange={event => handleInput({
                                target: {
                                    name: 'business_type',
                                    type: 'change',
                                    value: event
                                }
                            })}>
                            <Option value='sole'>Sole Proprietorship</Option>
                            <Option value='partnership'>Partnership</Option>
                            <Option value='corporation'>Corporation</Option>
                            <Option value='llc'>Limited Liability Company</Option>
                        </Select>
                    </div>

                    <div className={`${formClasses.formGroup} ${classes.halfInput}`}>
                    <label htmlFor='date_of_incorperation'>Date of Incorporation</label>
                        <Input id='date_of_incorperation' name='date_of_incorperation' placeholder='Select Date'
                            required value={formData.date_of_incorperation || ''} onChange={handleInput} type='date'/>
                    </div>
                </div>
            </div>

            <button className={classes.button} onClick={proceedToNextStep}>NEXT STEP</button>
        </Fragment>
    )
}

export const CorporateLoginDetails = () => {
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
        navigate('/register/corporate/otp-verification')
    }

    return (
        <Fragment>
            <h4>Register new account</h4>
            <small>Sign up for an account and start trading today</small>

            <div className={formClasses.formDiv} style={{ marginTop: '1.5em' }}>
                <div className={formClasses.formGroup}>
                    <label htmlFor='company_email'>Company Email</label>
                    <Input id='company_email' name='company_email' placeholder='Enter Email' type='email'
                        required value={formData.company_email || ''} onChange={handleInput}/>
                </div>

                <div className={formClasses.formGroup}>
                    <label htmlFor='password'>Password</label>
                    <Input.Password id='password' name='password' placeholder='Enter your Password'
                        required value={formData.password || ''} onChange={handleInput}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                </div>

                <div className={formClasses.formGroup}>
                    <label htmlFor='confirm_password'>Confirm Password</label>
                    <Input.Password id='confirm_password' name='confirm_password' placeholder='Confirm your Password'
                        required value={formData.confirm_password || ''} onChange={handleInput}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                </div>
            </div>

            <button className={classes.button} onClick={verifyAccount}>VERIFY ACCOUNT</button>
        </Fragment>
    )
}

export const CorporateOtpValidation = () => {
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

    const verifyViaCall = () => {}

    const handleFinish = event => {
        event.preventDefault()
        console.log(formData)
        if (!formData.otp) {
            alert('Please put a valid OTP')
            return;
        }
        setUserData(formData)
        setCurrentStep(currentStep + 1)
        navigate('/register/corporate/registration-successful')
    }

    return (
        <Fragment>
            <h4>Account details</h4>
            <small>Sign up for an account and start trading today</small>

            <div className={formClasses.formDiv} style={{ marginTop: '1.5em' }}>
                <div className={formClasses.formGroup}>
                    <label htmlFor='otp'>
                        Enter the 4-digit code that was sent to { userData.company_email || 'name@mymail.com' }
                    </label>
                    <Input id='otp' name='otp' placeholder='Enter Code'
                        required value={formData.otp || ''} onChange={handleInput}/>
                    <span role='button' onClick={resendOtp}>
                        <small className={classes.small}>Resend Code</small>
                    </span>
                    <span role='button' onClick={verifyViaCall}>
                        <small className={classes.small}>Verify via Phone Call</small>
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