import React, { Fragment, lazy, Suspense, useEffect } from 'react';
import { Routes as Switch, Route, Navigate, useLocation } from 'react-router-dom';
import Home from '../views/Home';
import Welcome from '../views/Welcome';
import { ResetForm, OtpValidation } from '../components/Authentication/PasswordReset';
import ActivitySpinner from '../components/ActivitySpinner';

const Authentication = lazy(() => import(/* webpackChunkName: "Authentication" */'../views/Authentication'))
const SignIn = lazy(() => import(/* webpackChunkName: "Authentication.SignIn" */'../components/Authentication/SignIn'))
const PasswordReset = lazy(() => import(/* webpackChunkName: "Authentication.PasswordReset" */'../components/Authentication/PasswordReset'))

const Routes = () => {
    const location = useLocation()

    // useEffect used to achieve moving back to the top of the page on each route change.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location])

    return (
        <Fragment>
            <Switch>
                <Route path="/" element={<Home />}>
                    <Route exact path="/" element={<Navigate to={{ pathname: '/welcome'}}/>}/>

                    <Route path="welcome" element={<Welcome />}/>

                    <Route path="sign-in" element={<Suspense fallback={<ActivitySpinner/>}><Authentication/></Suspense>}>
                        <Route index element={<Suspense fallback={<ActivitySpinner/>}><SignIn/></Suspense>}/>

                        <Route path="password-reset" element={<Suspense fallback={<ActivitySpinner/>}><PasswordReset/></Suspense>}>
                            <Route index element={<ResetForm/>}/>

                            <Route path="otp-validation" element={<OtpValidation/>}/>
                        </Route>
                    </Route>
                </Route>
            </Switch>
        </Fragment>
    );
}
 
export default Routes;