import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
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

const pathsToDisableAlertDiv = ['otp-verification']

const Home = () => {
    const classes = useStyles()
    const { pathname } = useLocation()

    const toggleAlertDiv = () => {
        let pathArray = pathname.split('/').filter(Boolean)
        const path = pathArray[pathArray.length - 1]
    
        return pathsToDisableAlertDiv.includes(path) ? false : true
      }

    return (
        <div className={classes.wrapper}>
            <AppLogo/>

            
            { toggleAlertDiv() && (<div id='alertDiv'></div>)}

            <Outlet/>
        </div>
    );
}
 
export default Home;