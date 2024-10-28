import { useSignin } from '../api/UserApi'
import AuthForm from '../components/AuthForm'

export default function SignIn() {
    const signin = useSignin()
    return (
        <AuthForm handleSubmit={signin} title="Login to your account" miniTitle="Don't have an account?" miniButton="Signup" button="Sign In" />
    )
}
