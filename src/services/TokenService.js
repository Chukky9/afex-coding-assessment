import jwt_decode from "jwt-decode";

function TokenService() {
    const tokenStorageName = 'afex-token'

    const hasToken = () => {
        return sessionStorage.hasOwnProperty(tokenStorageName)
    }
    
    const getToken = () => {
        if (!hasToken()) {
            return false
        }
        const tokenObject = sessionStorage.getItem(tokenStorageName)
        const userToken = JSON.parse(tokenObject)
    
        return userToken?.token
    }

    const removeToken = () => {
        sessionStorage.removeItem(tokenStorageName)
    }

    const saveToken = token => {
        if (!token) {
            return false
        }
        let jsonTokenObject = JSON.stringify({ token })
        sessionStorage.setItem(tokenStorageName, jsonTokenObject)

        return true
    }

    const getTokenExpirationDate = token => {
        let decoded = jwt_decode(token)
        if (typeof decoded.exp === 'undefined') {
            return null
        }

        return new Date(decoded.exp * 1000)
    }

    const isTokenExpired = () => {
        let token = getToken()

        if (!token) {
            return true
        }

        const exp_date = getTokenExpirationDate(token)

        if (exp_date === null) {
            return false
        }

        return ((new Date().valueOf() + (0)) > exp_date.valueOf())
    }

    return { getToken, removeToken, saveToken, isTokenExpired }
}

export default TokenService