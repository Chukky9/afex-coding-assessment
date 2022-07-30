import React, { Fragment } from 'react';
import { createUseStyles } from 'react-jss';
import TopBar from '../components/Dashboard/TopBar';
import SideBar from '../components/Dashboard/SideBar';
import Footer from '../components/Dashboard/Footer';
import { Outlet } from 'react-router-dom';

const useStyles = createUseStyles({
    wrapper: {
        minHeight: '100vh',
        height: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        '& .central-div': {
            width: '100%',
            display: 'flex',
            position: 'relative',
            height: '100%'
        }
    }
})

const Dashboard = () => {
    const classes = useStyles()

    return (
        <div className={classes.wrapper}>
            <TopBar/>
            
            <div className='central-div'>
                <SideBar/>
                <Outlet/>
            </div>
            
            <Footer/>
        </div>
    );
}
 
export default Dashboard;