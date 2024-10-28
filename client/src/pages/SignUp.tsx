import { useSignup } from "../api/UserApi";
import AuthForm from "../components/AuthForm";

export default function SignUp() {
    const signup = useSignup()
    return (
        <AuthForm handleSubmit={signup} title='Create an account' miniTitle='Already have an account?' miniButton='Login' button='Sign Up' />
    )
}