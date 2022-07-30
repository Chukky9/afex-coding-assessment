import { manager } from "../utils/helpers"
import TokenService from "./TokenService";

const { getToken } = TokenService()

function AuthenticationService() {

    const loginUser = async (params = {}) => {
        console.log('params', params)
        const { email, password } = params
        if (!email || !password) {
            return false
        }
        try {
            let data = { email, password, auth_type: 'password' }
            console.log('data sent', { email, password, auth_type: 'password' })
            manager.encrypt(data)
            const headers = new Headers()
            headers.set("Content-Type", "application/json")
            return await fetch("https://comx-sand-api.afexnigeria.com/api/login", {
                method: "POST",
                body: JSON.stringify(data),
                headers
            })
            .then(loginResponse => loginResponse.json())
            .then(loginResponse => {

                manager.decrypt(loginResponse)
                if (loginResponse.data) {
                    manager.decrypt(loginResponse.data)
                }
                console.log('login fetch loginResponse', loginResponse)
                return loginResponse
            })
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const passwordReset = async (params = {}) => {
        const { email } = params
        if (!email) {
            return false
        }
        try {
            let data = { email }
            console.log('data sent', { email })
            manager.encrypt(data)
            const headers = new Headers()
            headers.set("Content-Type", "application/json")
            return await fetch("https://comx-sand-api.afexnigeria.com/api/password-reset-request", {
                method: "POST",
                body: JSON.stringify(data),
                headers
            })
            .then(passwordResetResponse => passwordResetResponse.json())
            .then(passwordResetResponse => {

                manager.decrypt(passwordResetResponse)
                console.log('login fetch passwordResetResponse', passwordResetResponse)
                return passwordResetResponse
            })
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const passwordResetOtpValidation = async (params = {}) => {
        const { otp, email } = params
        if (!otp || !email) {
            return false
        }
        try {
            let data = { otp, email }
            console.log('data being sent', data)
            manager.encrypt(data)
            const headers = new Headers()
            headers.set("Content-Type", "application/json")
            return await fetch("https://comx-sand-api.afexnigeria.com/api/password-reset-otp-validation", {
                method: "POST",
                body: JSON.stringify(data),
                headers
            })
            .then((optResponse) => optResponse.json())
            .then((optResponse) => {
                manager.decrypt(optResponse)
                console.log('individual fetch optResponse', optResponse)
                return optResponse
            })
        } catch (error) {
            console.error(error)
            return false
        }
    }

    // const passwordChange = async (params = {}) => {
    //     const { email, new_password } = params
    //     if (!email || !new_password) {
    //         return false
    //     }
    //     try {
    //         let data = { email, new_password }
    //         manager.encrypt(data)
    //         const response = await Axios.post("https://comx-sand-api.afexnigeria.com/api/password-change", data)
    //         manager.decrypt(response)
    //         console.log('password change response', response)
    //         return response
    //     } catch (error) {
    //         console.error(error)
    //         return { error: true, message: error.response?.message }
    //     }
    // }

    const registerIndividualUser = async (params = {}) => {
        console.log('params', params)
        const { email, password, first_name, last_name, phone } = params
        if (!email || !password || !first_name || !last_name || !phone) {
            return false
        }
        try {
            let data = { email, password, first_name, last_name, phone: '+234' + phone, auth_type: 'password', occupation: 'Farmer', referral_code: null }
            console.log('data sent', { email, password, first_name, last_name, phone: '+234' + phone, auth_type: 'password', occupation: 'Farmer', referral_code: null })
            manager.encrypt(data)
            const headers = new Headers()
            headers.set("Content-Type", "application/json")
            return await fetch("https://comx-sand-api.afexnigeria.com/api/register", {
                method: "POST",
                body: JSON.stringify(data),
                headers
            })
                .then((individualRegisterResponse) => individualRegisterResponse.json())
                .then((individualRegisterResponse) => {
                    
                    manager.decrypt(individualRegisterResponse) // impure decryption
                    if (individualRegisterResponse.data) {
                        manager.decrypt(individualRegisterResponse.data)
                    }
                    console.log('individual fetch individualRegisterResponse', individualRegisterResponse)
                    return individualRegisterResponse // something intelligible
            });
        } catch (error) {
            console.error(error)
            return false;
        }
    }

    const registerCorporateUser = async (params = {}) => {
        console.log('params', params)
        const { email, password, company_name, nature_of_business, date_of_incorporation } = params
        if (!email || !password || !company_name || !nature_of_business || !date_of_incorporation) {
            return false
        }
        try {
            let data = { 
                email, password, company_name, nature_of_business, date_of_incorporation, auth_type: 'password',
                rc_number: Math.floor(Math.random() * 10000000000).toString(), referral_code: "", company_phone: '+234' + Math.floor(Math.random() * 10000000000).toString(), company_website: 'https://www.youtube.com/'
            }
            console.log('data sent', { 
                email, password, company_name, nature_of_business, date_of_incorporation, auth_type: 'password',
                rc_number: Math.floor(Math.random() * 10000000000).toString(), referral_code: "", company_phone: '+234' + Math.floor(Math.random() * 10000000000).toString(), company_website: 'https://www.youtube.com/'
            })
            manager.encrypt(data)
            const headers = new Headers()
            headers.set("Content-Type", "application/json")
            return await fetch("https://comx-sand-api.afexnigeria.com/api/corporate-client-register", {
                method: "POST",
                body: JSON.stringify(data),
                headers
              })
                .then((corporateRegisterResponse) => corporateRegisterResponse.json())
                .then((corporateRegisterResponse) => {
                  manager.decrypt(corporateRegisterResponse) // impure decryption
                  console.log('coporate reg corporateRegisterResponse', corporateRegisterResponse)
                  return corporateRegisterResponse // something intelligible
            });
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const registrationOtpValidate = async (params = {}) => {
        const { otp } = params
        if (!otp) {
            return false
        }
        try { 
            let data = { otp }
            manager.encrypt(data)
            const headers = new Headers()
            headers.set("Content-Type", "application/json")
            headers.set("Authorization", `Bearer ${
                getToken()
            }`);
            return await fetch("https://comx-sand-api.afexnigeria.com/api/otp/validate", {
                method: "POST",
                body: JSON.stringify(data),
                headers
            })
            .then((optResponse) => optResponse.json())
            .then((optResponse) => {
                manager.decrypt(optResponse)
                console.log('individual fetch optResponse', optResponse)
                return optResponse
            })
            
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const resendOtp = async (params = {}) => {
        const { email } = params
        if (!email) {
            return false
        }
        try {
            let data = { email }
            manager.encrypt(data)
            const headers = new Headers()
            headers.set("Content-Type", "application/json")
            headers.set("Authorization", `Bearer ${
                getToken()
            }`);
            return await fetch("https://comx-sand-api.afexnigeria.com/api/otp/resend", {
                method: "POST",
                body: JSON.stringify(data),
                headers
            })
            .then(resendResponse => resendResponse.json())
            .then(resendResponse => {
                manager.decrypt(resendResponse)
                console.log('individual fetch resendResponse', resendResponse)
                return resendResponse
            })
        } catch (error) {
            console.error(error)
            return { error: true, message: error.response?.message }
        }
    } 

    return {
        loginUser, passwordReset, resendOtp,
        passwordResetOtpValidation, registerIndividualUser, 
        registerCorporateUser, registrationOtpValidate,
    }
}

export default AuthenticationService