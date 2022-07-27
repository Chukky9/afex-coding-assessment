import React, { Fragment, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormStyles } from '../CustomStyles';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Input, Checkbox } from 'antd';
import { formReducer } from '../../utils/helpers';

const SignIn = () => {
    const navigate = useNavigate()
    const formClasses = useFormStyles()
    const [loginData, setLoginData] = useReducer(formReducer, {})

    const handleInput = event => {
        const isChecked = event.target.type === 'checkbox'
        setLoginData({
            name: event.target.name,
            value: isChecked ? event.target.checked : event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        console.log(loginData)
    }

    const goBack = event => {
        event.preventDefault()
        navigate(-1)
    }

    return (
        <Fragment>
            <h4>Sign In to ComX</h4>
                <small>Enter your login credentials below.</small>

                <div className={formClasses.formGroup}>
                    <label htmlFor='email'>Your Email</label>
                    <Input id='email' name='email' placeholder='Enter your Email'
                        required value={loginData.email || ''} onChange={handleInput}/>
                </div>

                <div className={formClasses.formGroup}>
                    <label htmlFor='password'>Your Password</label>
                    <Input.Password id='password' name='password' placeholder='Enter your Password'
                        required value={loginData.password || ''} onChange={handleInput}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                </div>

                <div className={formClasses.formLine}>
                    <Checkbox htmlFor="remember_me" label="Remember me"
                        id="remember_me" name="remember_me" onChange={handleInput}
                        checked={loginData.remember_me || false}>
                        Stay Signed In
                    </Checkbox>

                    <Link to="/sign-in/password-reset">
                        Forgot password?
                    </Link>
                </div>

                <button className='signin-button' onClick={handleSubmit}>Sign In</button>
                <button className='back-button' onClick={goBack}>Back</button>
        </Fragment>
    );
}
 
export default SignIn;