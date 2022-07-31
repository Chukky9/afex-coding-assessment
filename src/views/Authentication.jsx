import React from 'react';
import { Outlet } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: {
        width: '40%',
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
            padding: '0.3em'
        },
        '@media (max-width: 420px)': {
            width: '95%'
        },
        '@media (max-width: 320px)': {
            width: '100%',
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