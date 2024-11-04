import axios from "axios"
import { ReceviedPropType, UserAuthType } from "../types"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const base_url = import.meta.env.VITE_API_BASE_URL
export const useSignup = () => {
    const {setEmail}=useContext(UserContext)
    const signup = async (data: UserAuthType): Promise<ReceviedPropType> => {
        try {
            const response = await axios.post(`${base_url}/auth/signup`, data, {
                withCredentials: true
            })
            const responseData=response.data
            setEmail(responseData?.remainingUserData?.email)
            return response.data
        } catch (error) {
            return error as ReceviedPropType
        }
    }
    return signup
}
export const useSignin = () => {
    const {setEmail}=useContext(UserContext)
    const signin = async (data: UserAuthType): Promise<ReceviedPropType> => {
        try {
            const response = await axios.post(`${base_url}/auth/signin`, data, {
                withCredentials: true
            })
            const responseData=response.data
            console.log(responseData);
            
            setEmail(responseData?.remainingUserData?.email)
            return response.data
        } catch (error) {
            console.log(error);
            throw error
            // return error as ReceviedPropType
        }
    }
    return signin
}

