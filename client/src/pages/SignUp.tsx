import { useNavigate } from "react-router-dom";
import { useSignup } from "../api/UserApi";
import AuthForm from "../components/AuthForm";
import { AxiosError } from "axios";
import { useState } from "react";

export default function SignUp() {
    const navigate = useNavigate()
    const signup = useSignup()
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
    return (
        <AuthForm handleSubmit={handleSignup} title='Create an account' miniTitle='Already have an account?' miniButton='Login' button='Sign Up' errorMessage={error} />
    )
}