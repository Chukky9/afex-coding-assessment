import { manager } from "../utils/helpers"
import TokenService from "./TokenService";

const { getToken } = TokenService()

function OtherService() {
    
    const getTableData = async () => {
        try {
            const headers = new Headers()
            headers.set("Content-Type", "application/json")
            headers.set("Authorization", `Bearer ${
                getToken()
            }`);
            return await fetch('https://comx-sand-api.afexnigeria.com/api/securities/boards', {
                method: "POST",
                headers
            })
            .then(dataResponse => dataResponse.json())
            .then(dataResponse => {
                manager.decrypt(dataResponse)
                if (dataResponse.data) {
                    manager.decrypt(dataResponse.data)
                }
                return dataResponse
            })
        } catch (error) {
            console.error(error)
            return false
        }
    }

    return { getTableData }
}

export default OtherService