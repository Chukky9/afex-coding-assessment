import React, { Fragment, lazy, Suspense, useEffect } from 'react';
import { Routes as Switch, Route, Navigate, useLocation } from 'react-router-dom';
import Home from '../views/Home';
import Welcome from '../views/Welcome';
import ActivitySpinner from '../components/ActivitySpinner';

const SignIn = lazy(() => import(/* webpackChunkName: "Authentication.SignIn" */'../views/SignIn'))

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
                    
                    <Route path="sign-in" element={<Suspense fallback={<ActivitySpinner/>}><SignIn/></Suspense>}/>
                </Route>
            </Switch>
        </Fragment>
    );
}
 
export default Routes;