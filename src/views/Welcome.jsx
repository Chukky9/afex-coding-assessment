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
        justifyContent: 'center'
    },
    card: {
        background: 'var(--white)',
        borderRadius: '0.2em',
        padding: '2em 3em',
        margin: '1em',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        lineHeight: 2,
        '& a': {
            margin: '1em 0',
            border: 'none',
            padding: '0.3em',
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
            <div className={classes.card}>
                <h5>Sign In to ComX</h5>
                <small>Welcome to Comx</small>
                <Link to='/sign-in' className='signin-button'>Sign In</Link>
            </div>

            <div className={classes.card}>
                <h5>Create an Account</h5>
                <small>Join the family</small>
                <Link to='' className='register-button'>Register</Link>
            </div>
        </div>
    );
}
 
export default Welcome;