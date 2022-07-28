import React, { Fragment, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { useFormStyles } from '../CustomStyles';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Input, Checkbox } from 'antd';
import { formReducer } from '../../utils/helpers';

const useStyles = createUseStyles({
    button: {
        margin: '1em 0',
        border: 'none',
        padding: '1em',
        borderRadius: '0.2em',
        fontSize: '0.8em',
        color: 'var(--white)',
        fontWeight: 600,
        textDecoration: 'none'
    },
    signin_button: {
        background: 'var(--green)',
    },
    back_button: {
        color: 'var(--black) !important',
    },
    anchor: {
        color: 'var(--red)',
        '& :hover': {
            color: 'var(--red)',
            textDecoration: 'underline'
        }
    },
   
})

const SignIn = () => {
    const navigate = useNavigate()
    const classes = useStyles()
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
                <Input id='email' name='email' placeholder='Enter your Email' type='email'
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

                <Link to="/sign-in/password-reset" className={classes.anchor}>
                    Forgot password?
                </Link>
            </div>

            <button className={`${classes.signin_button} ${classes.button}`} onClick={handleSubmit}>Sign In</button>
            <button className={`${classes.back_button} ${classes.button}`} onClick={goBack}>Back</button>
        </Fragment>
    );
}
 
export default SignIn;