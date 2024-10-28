import axios from "axios"
import { ReceviedPropType, UserAuthType } from "../types"

const base_url = import.meta.env.VITE_API_BASE_URL
export const useSignup = () => {
    const signup = async (data: UserAuthType): Promise<ReceviedPropType> => {
        try {
            const response = await axios.post(`${base_url}/auth/signup`, data, {
                withCredentials: true
            })
            return response.data
        } catch (error) {
            return error as ReceviedPropType
        }
    }
    return signup
}
export const useSignin = () => {
    const signin = async (data: UserAuthType): Promise<ReceviedPropType> => {
        try {
            const response = await axios.post(`${base_url}/auth/signin`, data, {
                withCredentials: true
            })
            return response.data
        } catch (error) {
            return error as ReceviedPropType
        }
    }
    return signin
}

