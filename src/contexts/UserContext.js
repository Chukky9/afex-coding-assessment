import React, { createContext, useReducer } from "react";
import { userReducer } from "../utils/helpers";

const UserContext = createContext('')

const UserProvider = ({ children }) => {
    const [user, setUser] = useReducer(userReducer, {})

    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    );
}
 
export { UserContext, UserProvider };