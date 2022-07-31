import React from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: {
        width: '50%',
        padding: '1em',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '@media (max-width: 1024px)': {
            width: '70%'
        },
        '@media (max-width: 768px)': {
            width: '90%',
        },
        '@media (max-width: 420px)': {
            width: '95%'
        },
        '& a': {
            margin: '1em 0',
            border: 'none',
            padding: '1em',
            borderRadius: '0.2em',
            fontSize: '0.8em',
            color: 'var(--white)',
            fontWeight: 600,
            textDecoration: 'none'
        },
        '& .signin-button': {
            background: 'var(--green)'
        },
        '& .register-button': {
            background: 'var(--black)'
        }
    }
})

const Welcome = () => {
    const classes = useStyles()

    return (
        <div className={classes.wrapper}>
            <div className='custom-card'>
                <h5>Sign In to ComX</h5>
                <small>Welcome to Comx</small>
                <Link to='/sign-in' className='signin-button'>Sign In</Link>
            </div>

            <div className='custom-card'>
                <h5>Create an Account</h5>
                <small>Join the family</small>
                <Link to='/register' className='register-button'>Register</Link>
            </div>
        </div>
    );
}
 
export default Welcome;