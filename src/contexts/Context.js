import React, { Fragment } from 'react';
import { UserProvider } from './UserContext';

const Context = ({ children }) => {

    return (
        <Fragment>
            <UserProvider>
                { children }
            </UserProvider>
        </Fragment>
    );
}
 
export default Context;