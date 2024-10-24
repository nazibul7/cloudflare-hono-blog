import axios from "axios"
import { UserAuthType } from "../types"

const base_url = import.meta.env.VITE_API_BASE_URL
export const useSignup = () => {
    const signup = async (data: UserAuthType) => {
        try {
            const response = await axios.post(`${base_url}/auth/signup`, data,{
                withCredentials:true
            })
            return response.data
        } catch (error) {
            return error
        }
    }
    return signup
}
export const useSignin = () => {
    const signin = async (data: UserAuthType) => {
        try {
            const response = await axios.post(`${base_url}/auth/signup`, data,{
                withCredentials:true
            })
            return response.data
        } catch (error) {
            return error
        }
    }
    return signin
}

