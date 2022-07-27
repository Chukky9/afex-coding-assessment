import React from 'react';
import { Outlet } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { AppLogo } from '../assets/app-logo';

const useStyles = createUseStyles({
    wrapper: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1em',
        '& img': {
            margin: '1em 0'
        }
    }
})

const Home = () => {
    const classes = useStyles()

    return (
        <div className={classes.wrapper}>
            <AppLogo/>

            <Outlet/>
        </div>
    );
}
 
export default Home;