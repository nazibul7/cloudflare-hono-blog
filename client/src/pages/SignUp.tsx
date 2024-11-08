import { useNavigate } from "react-router-dom";
import { useSignup } from "../api/UserApi";
import AuthForm from "../components/AuthForm";
import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function SignUp() {
    const navigate = useNavigate()
    const signup = useSignup()
    const {setEmail}=useContext(UserContext)
    const [error, setError] = useState<string | null>(null)
    const handleSignup = async (data: { email: string, password: string }) => {
        try {
            await signup(data)
            navigate('/')
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data || "An unknown error occured")
            }
            else {
                setError("An unknown error occured")
            }
        }
    }
    const base_url = import.meta.env.VITE_API_BASE_URL
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${base_url}/auth`, {
                    withCredentials: true
                })
                const data = await response.data
                setEmail(data.email)
                navigate('/')
            } catch (error) {
                navigate('/signin')
                console.log(error);
            }
        }
        fetchUser()
    }, [])
    return (
        <AuthForm handleSubmit={handleSignup} title='Create an account' miniTitle='Already have an account?' miniButton='Login' button='Sign Up' errorMessage={error} />
    )
}