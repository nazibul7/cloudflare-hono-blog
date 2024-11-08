import { useNavigate } from 'react-router-dom'
import { useSignin } from '../api/UserApi'
import AuthForm from '../components/AuthForm'
import { useContext, useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { UserContext } from '../context/UserContext'

export default function SignIn() {
    const navigate = useNavigate()
    const signin = useSignin()
    const { setEmail } = useContext(UserContext)
    const [error, setError] = useState<string | null>(null)
    const handleSignin = async (data: { email: string, password: string }) => {
        try {
            await signin(data)
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
        <AuthForm handleSubmit={handleSignin} title="Login to your account" miniTitle="Don't have an account?" miniButton="Signup" button="Sign In" errorMessage={error} />
    )
}
