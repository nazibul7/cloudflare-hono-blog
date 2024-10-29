import { useNavigate } from 'react-router-dom'
import { useSignin } from '../api/UserApi'
import AuthForm from '../components/AuthForm'
import { useState } from 'react'
import { AxiosError } from 'axios'

export default function SignIn() {
    const navigate = useNavigate()
    const signin = useSignin()
    const [error, setError] = useState<string | null>(null)
    const handleSignin = async (data: { email: string, password: string }) => {
        try {
            await signin(data)
            navigate('/')
        } catch (error) {
            if(error instanceof AxiosError){
                setError(error.response?.data || "An unknown error occured")
            }
            else{
                setError("An unknown error occured")
            }
        }
    }
    return (
        <AuthForm handleSubmit={handleSignin} title="Login to your account" miniTitle="Don't have an account?" miniButton="Signup" button="Sign In" errorMessage={error} />
    )
}
