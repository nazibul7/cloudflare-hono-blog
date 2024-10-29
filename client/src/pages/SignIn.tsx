import { useNavigate } from 'react-router-dom'
import { useSignin } from '../api/UserApi'
import AuthForm from '../components/AuthForm'

export default function SignIn() {
    const navigate=useNavigate()
    const signin = useSignin()
    const handleSignin=async(data:{email:string,password:string})=>{
        try {
            await signin(data)
            navigate('/')
        } catch (error) {
            console.log("Signin failed",error);
        }
    }
    return (
        <AuthForm handleSubmit={handleSignin} title="Login to your account" miniTitle="Don't have an account?" miniButton="Signup" button="Sign In" />
    )
}
