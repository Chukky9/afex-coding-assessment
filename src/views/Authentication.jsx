import React from 'react';
import { Outlet } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: {
        width: '50%',
        padding: '1em',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '& button': {
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
            background: 'var(--green)',
        },
        '& .back-button': {
            color: 'var(--black) !important',
        },
        '& a': {
            color: 'var(--red)'
        },
        '& a:hover': {
            color: 'var(--red)',
            textDecoration: 'underline'
        }
    },
})

const Authentication = () => {
    const classes = useStyles()

    return (
        <div className={classes.wrapper}>
            <div className='custom-card'>
                <Outlet/>
            </div>
        </div>
    );
}
 
export default Authentication;