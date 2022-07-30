import React, { Fragment, useReducer, useEffect, useRef, useState, useContext } from 'react';
import { NavLink, useOutletContext, useNavigate } from 'react-router-dom';
import { EyeTwoTone, EyeInvisibleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import { useFormStyles, useRegistrationStyles } from '../CustomStyles';
import { UserContext } from '../../contexts/UserContext';
import { formReducer } from '../../utils/helpers';
import AuthenticationService from '../../services/AuthenticationService'
import TokenService from '../../services/TokenService';
import { alert } from '../../utils/alerts';

const smallAlertStyles = {
    textAlign: 'initial',
    color: 'var(--red)'
}

const { Option } = Select
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
const { registerIndividualUser, registrationOtpValidate, resendOtp } = AuthenticationService()
const { saveToken } = TokenService()

export const IndividualBasicInformation = () => {
    const navigate = useNavigate()
    const classes = useRegistrationStyles()
    const formClasses = useFormStyles()
    const [formData, setFormData] = useReducer(formReducer, {})
    const { step, user } = useOutletContext()
    const [currentStep, setCurrentStep] = step ?? []
    const [, setUserData] = user ?? []
    const [validated, setValidated] = useState(true)

    const formIsValid = () => {
        let { first_name, last_name, email } = formData

        return !!(first_name && last_name && email && email.includes('@'))
    }

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
        if (!formIsValid()) {
            setValidated(false)
            return;
        } else {
            setValidated(true)
        }
        console.log(formData)
        setUserData(formData)
        setCurrentStep(currentStep + 1)
        navigate('/register/individual/login-details')
    }

    useEffect(() => {
        if (currentStep !== 0) {
            setCurrentStep(0)
        }
    })

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
                        <label htmlFor='first_name'>Your First Name</label>
                        <Input id='first_name' name='first_name' placeholder='Enter your First Name'
                            required value={formData.first_name || ''} onChange={handleInput}
                            status={(!validated && !formData.first_name) ? 'error' : undefined}/>
                        { (!validated && !formData.first_name) && <small style={smallAlertStyles}>This field is required</small>}
                    </div>

                    <div className={`${formClasses.formGroup} ${classes.halfInput}`}>
                        <label htmlFor='last_name'>Your Last Name</label>
                        <Input id='last_name' name='last_name' placeholder='Enter your Last Name'
                            required value={formData.last_name || ''} onChange={handleInput}
                            status={(!validated && !formData.last_name) ? 'error' : undefined}/>
                        { (!validated && !formData.last_name) && <small style={smallAlertStyles}>This field is required</small>}
                    </div>
                </div>

                <div className={formClasses.formGroup}>
                    <label htmlFor='email'>Your Email</label>
                    <Input id='email' name='email' placeholder='Enter your Email' type='email'
                        required value={formData.email || ''} onChange={handleInput}
                        status={(!validated && (!formData.email || (formData.email && !formData.email.includes('@')))) ? 'error' : undefined}/>
                    { (!validated && (!formData.email || (formData.email && !formData.email.includes('@')))) && <small style={smallAlertStyles}>Enter a valid email</small>}
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
    const { setUser } = useContext(UserContext)
    const { step, user } = useOutletContext()
    const [currentStep, setCurrentStep] = step ?? []
    const [userData, setUserData] = user ?? []
    const [validated, setValidated] = useState(true)
    let mounted = useRef(true)
    
    const formIsValid = () => {
        let { password, confirm_password, phone } = formData

        return !!(password && confirm_password && phone && passwordRegex.test(password) && (password === confirm_password))
    }

    const handleInput = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        })
    }

    const verifyAccount = async () => {
        if (!formIsValid()) {
            setValidated(false)
            return;
        } else {
            setValidated(true)
        }
        let data = { ...userData, ...formData}
        console.log(formData)
        setUserData(formData)
        const registerResponse = await registerIndividualUser(data)
        console.log('response from inside component', registerResponse)
        if (mounted.current) {
            if (!registerResponse || (registerResponse && registerResponse.responseCode !== '106')) {
                alert('Error creating your account.', 'danger')
            } else {
                setUser(registerResponse?.data ?? {})
                saveToken(registerResponse?.data?.token)
                setCurrentStep(currentStep + 1)
                navigate('/register/individual/otp-verification')
            }
        }
    }

    useEffect(() => {
        mounted.current = true
        if (currentStep !== 1) {
            setCurrentStep(1)
        }

        return () => mounted.current = false
    })

    return (
        <Fragment>
            <h4>Register new account</h4>
            <small>Sign up for an account and start trading today</small>

            <div className={formClasses.formDiv} style={{ marginTop: '1.5em' }}>
                <div className={formClasses.formGroup}>
                    <label htmlFor='password'>Password</label>
                    <Input.Password id='password' name='password' placeholder='Enter your Password'
                        required value={formData.password || ''} onChange={handleInput}
                        iconRender={visible => (visible ? <EyeTwoTone style={{ color: 'var(--red)' }}/> : <EyeInvisibleOutlined />)}
                        status={(!validated && !formData.password) ? 'error' : undefined}/>
                    { ((formData.password) && (!passwordRegex.test(formData.password))) && <small style={smallAlertStyles}><InfoCircleOutlined/> Must be at least 8 characters, include an uppercase and lowercase letter, number and special symbol</small>}
                    { (!validated && !formData.password) && <small style={smallAlertStyles}>This field is required</small>}
                </div>

                <div className={formClasses.formGroup}>
                    <label htmlFor='confirm_password'>Confirm Password</label>
                    <Input.Password id='confirm_password' name='confirm_password' placeholder='Confirm Password'
                        required value={formData.confirm_password || ''} onChange={handleInput}
                        iconRender={visible => (visible ? <EyeTwoTone style={{ color: 'var(--red)' }}/> : <EyeInvisibleOutlined />)}
                        status={(formData.password !== formData['confirm_password']) ? 'error' : undefined}/>
                    { (formData.password !== formData['confirm_password']) && <small style={smallAlertStyles}><InfoCircleOutlined/> Must match password</small>}
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
                            type='number' style={{ width: '75%' }}
                            status={(!validated && !formData.phone) ? 'error' : undefined}/>
                    </div>
                    { (!validated && !formData.phone) && <small style={smallAlertStyles}>This field is required</small>}
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
    const [userData, ] = user ?? []
    const [validated, setValidated] = useState(true)
    let mounted = useRef(true)

    const handleInput = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        })
    }

    const goBack = () => {
        navigate(-1)
    }

    const resendOtpCode = async () => {
        const resendResponse = await resendOtp()
        console.log('response from inside component', resendResponse)
        if (mounted.current) {
            if (!resendResponse || (resendResponse && resendResponse.responseCode !== '100')) {
                alert('Error resending request', 'danger')
            } else {
                alert('Request resent successfully', 'success')
            }
        }
    }

    const handleFinish =  async () => {
        if (!formData.otp) {
            setValidated(false)
            return;
        } else { 
            setValidated(true)
        }
        console.log(formData)
        const otpValidationResponse = await registrationOtpValidate(formData)
        console.log('response from inside component', otpValidationResponse)
        if (mounted.current) {
            if (!otpValidationResponse || (otpValidationResponse && otpValidationResponse.responseCode !== '100')) {
                alert('Error processing OTP', 'danger')
            } else {
                setCurrentStep(currentStep + 1)
                navigate('/register/individual/registration-successful')
            }
        }
    }

    useEffect(() => {
        mounted.current = true
        if (currentStep !== 2) {
            setCurrentStep(2)
        }

        return () => mounted.current = false
    })

    return (
        <Fragment>
            <h4>Account details</h4>
            <small>Sign up for an account and start trading today</small>

            <div className={formClasses.formDiv} style={{ marginTop: '1.5em' }}>
                <div className={formClasses.formGroup}>
                    <label htmlFor='otp'>
                        Enter the 4-digit code that was sent to { (userData.phone) ? `${'+234' + userData.phone} and` : ''} { userData.email || 'name@mymail.com' }
                    </label>
                    <Input id='otp' name='otp' placeholder='Enter Code' type='number'
                        required value={formData.otp || ''} onChange={handleInput}
                        status={(!validated && !formData.otp) ?  'error' : undefined}/>
                    { (!validated && !formData.otp) && <small style={smallAlertStyles}>This field is required</small>}
                    <span role='button' onClick={resendOtpCode}>
                        <small className={classes.small}>Resend Code</small>
                    </span>
                </div>
                <div id='alertDiv'></div>
            </div>

            <div className={formClasses.formLine}>
                <button className={classes.button} style={{ color: 'var(--black)' }} onClick={goBack}>BACK</button>
                <button className={classes.button} onClick={handleFinish}>FINISH</button>
            </div>
        </Fragment>
    )
}