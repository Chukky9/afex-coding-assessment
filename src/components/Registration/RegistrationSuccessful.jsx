import React, { Fragment, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import successImage from '../../assets/images/reg-success-image.png'

const useStyles = createUseStyles({
    button: {
        background: 'none',
        padding: '0.5em',
        fontWeight: 600,
        border: 'none',
        color: 'var(--red)',
        margin: '1em 0'
    },
    image: {
        height: '60%',
        width: '60%',
        margin: 'auto !important'
    }
})

const RegistrationSuccessful = () => {
    const navigate = useNavigate()
    const classes = useStyles()
    const { step, user } = useOutletContext()
    const [currentStep, setCurrentStep] = step ?? []
    const [userData, ] = user ?? []

    const gotoDashboard = () => {
        navigate('/dashboard')
    }

    useEffect(() => {
        if (currentStep !== 3) {
            setCurrentStep(3)
        }
    })

    return (
        <Fragment>
            <img className={`img-responsive ${classes.image}`} src={successImage} alt="Registration successful"/>

            <h4>Registration Complete</h4>
            <small>
                Dear { userData.firstname || userData.company_name || 'User' }, Your registration is now complete. <br/>
                You  may proceed to your dashboard and start trading commodities.
            </small>

            <button className={classes.button} onClick={gotoDashboard}>GO TO DASHBOARD</button>
        </Fragment>
    );
}
 
export default RegistrationSuccessful;