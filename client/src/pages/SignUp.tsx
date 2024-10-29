import { useNavigate } from "react-router-dom";
import { useSignup } from "../api/UserApi";
import AuthForm from "../components/AuthForm";

export default function SignUp() {
    const navigate=useNavigate()
    const signup = useSignup()
    const handleSignup=async(data:{email:string,password:string})=>{
        try {
            await signup(data)
            navigate('/')
        } catch (error){
            console.log();
        }
    }
    return (
        <AuthForm handleSubmit={handleSignup} title='Create an account' miniTitle='Already have an account?' miniButton='Login' button='Sign Up' />
    )
}