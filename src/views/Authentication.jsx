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