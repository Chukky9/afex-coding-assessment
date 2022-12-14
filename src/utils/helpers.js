import Manager from "../utils/encryption";

const currencyOptions = {
    minimumFractionDigits: 0,
    MaximumFractionDigits: 2
}

export const getPrice = (price = 0) => {
    return price.toLocaleString(undefined, currencyOptions)
}

export const formReducer = (state, event = null) => {
    if (!event) {
        return {}
    }
    return {
        ...state,
        [event.name]: event.value
    }
}

export const userReducer = (state, user = {}) => {
    if (!Object.keys(user).length) {
        return {}
    }
    return {
        ...state,
        ...user
    }
}

export const manager = new Manager({ 
    key: process.env.REACT_APP_KEY, 
    vector: process.env.REACT_APP_VECTOR
})