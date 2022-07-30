import React, { Fragment, lazy, Suspense, useEffect } from 'react';
import { Routes as Switch, Route, Navigate, useLocation } from 'react-router-dom';
import Home from '../views/Home';
import Welcome from '../views/Welcome';
import { ResetForm, OtpValidation } from '../components/Authentication/PasswordReset';
import { IndividualBasicInformation, IndividualLoginDetails, IndividualOtpValidation } from '../components/Registration/Individual';
import { CorporateCompanyInformation, CorporateLoginDetails, CorporateOtpValidation } from '../components/Registration/Corporate';
import ActivitySpinner from '../components/ActivitySpinner';
import RouteGuard from './RouteGuard';

const Authentication = lazy(() => import(/* webpackChunkName: "Authentication" */'../views/Authentication'))
const SignIn = lazy(() => import(/* webpackChunkName: "Authentication.SignIn" */'../components/Authentication/SignIn'))
const PasswordReset = lazy(() => import(/* webpackChunkName: "Authentication.PasswordReset" */'../components/Authentication/PasswordReset'))

const Register = lazy(() => import(/* webpackChunkName: "Register" */'../views/Register'))
const RegistrationSuccessful = lazy(() => import(/* webpackChunkName: "Register.Successful" */'../components/Registration/RegistrationSuccessful'))

const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard" */'../views/Dashboard'))
const Market = lazy(() => import(/* webpackChunkName: "Dashboard.Market" */'../components/Dashboard/Market'))
const MarketOrderBook = lazy(() => import(/* webpackChunkName: "Dashboard.Market.OrderBook" */'../components/Dashboard/Market.OrderBook'));

const Routes = () => {
    const location = useLocation()

    // useEffect used to achieve moving back to the top of the page on each route change.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location])

    return (
        <Fragment>
            <Switch>
                {/* Dashboard routes */}
                <Route path="/dashboard" element={<RouteGuard routeRedirect="/sign-in" component={Dashboard}/>}>
                    <Route exact path="/dashboard" element={<Navigate to={{ pathname: '/dashboard/market' }}/>}/>

                    <Route path="market" element={<Suspense fallback={<ActivitySpinner/>}><Market/></Suspense>}>
                        <Route exact path="/dashboard/market" element={<Navigate to={{ pathname: '/dashboard/market/order-book' }}/>}/>

                        <Route path="order-book" element={<Suspense fallback={<ActivitySpinner/>}><MarketOrderBook/></Suspense>}/>
                    </Route>
                </Route>

                <Route path="/" element={<Home />}>
                    <Route exact path="/" element={<Navigate to={{ pathname: '/welcome'}}/>}/>

                    <Route path="welcome" element={<Welcome />}/>

                    {/* Sign In routes and components */}
                    <Route path="sign-in" element={<Suspense fallback={<ActivitySpinner/>}><Authentication/></Suspense>}>
                        <Route index element={<Suspense fallback={<ActivitySpinner/>}><SignIn/></Suspense>}/>

                        <Route path="password-reset" element={<Suspense fallback={<ActivitySpinner/>}><PasswordReset/></Suspense>}>
                            <Route index element={<ResetForm/>}/>

                            <Route path="otp-validation" element={<OtpValidation/>}/>
                        </Route>
                    </Route>

                    {/* Register routes and components */}
                    <Route path="register" element={<Suspense fallback={<ActivitySpinner/>}><Register/></Suspense>}>
                        <Route exact path="/register" element={<Navigate to={{ pathname: '/register/individual'}}/>}/>
                        <Route exact path="individual" element={<Navigate to={{ pathname: '/register/individual/basic-information'}}/>}/>
                        <Route exact path="corporate" element={<Navigate to={{ pathname: '/register/corporate/company-information'}}/>}/>

                        {/* Individual registration routes */}
                        <Route path="individual/basic-information" element={<IndividualBasicInformation/>}/>
                        <Route path="individual/login-details" element={<IndividualLoginDetails/>}/>
                        <Route path="individual/otp-verification" element={<IndividualOtpValidation/>}/>
                        <Route path="individual/registration-successful" element={<Suspense fallback={<ActivitySpinner/>}><RegistrationSuccessful/></Suspense>}/>

                        {/* Individual registration routes */}
                        <Route path="corporate/company-information" element={<CorporateCompanyInformation/>}/>
                        <Route path="corporate/login-details" element={<CorporateLoginDetails/>}/>
                        <Route path="corporate/otp-verification" element={<CorporateOtpValidation/>}/>
                        <Route path="corporate/registration-successful" element={<Suspense fallback={<ActivitySpinner/>}><RegistrationSuccessful/></Suspense>}/>
                    </Route>
                </Route>
            </Switch>
        </Fragment>
    );
}
 
export default Routes;