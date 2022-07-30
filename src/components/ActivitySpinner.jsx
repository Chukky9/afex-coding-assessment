import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& h5': {
            margin: '0.5em 0'
        }
    }
})

const ActivitySpinner = () => {
    const classes = useStyles()

    return (
        <div className={classes.wrapper}>
            <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h5>Please Wait...</h5>
        </div>
    );
}
 
export default ActivitySpinner;