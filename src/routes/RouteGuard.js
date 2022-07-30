import React, { Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import TokenService from '../services/TokenService';
import ActivitySpinner from '../components/ActivitySpinner';

const { getToken, isTokenExpired, removeToken } = TokenService()

const RouteGuard = ({
    component: Component,
    routeRedirect,
    ...rest
}) => {
    const token = getToken()
    const { pathname } = useLocation()

    if (token && isTokenExpired()) {
        removeToken()
        return (<Navigate to={{ pathname: routeRedirect }} state={{ from: pathname }}/>)
    } else if (!token) {
        return (<Navigate to={{ pathname: routeRedirect }} state={{ from: pathname }}/>)
    } else {
        return (
            <Suspense fallback={<ActivitySpinner />}>
                <Component {...rest}/>
            </Suspense>
        )
    }
}
 
export default RouteGuard;