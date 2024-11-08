import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const base_url = import.meta.env.VITE_API_BASE_URL
export default function Home() {
    const { email,setEmail } = useContext(UserContext)
    const navigate=useNavigate()
    
    if(!email){
        navigate('/signin')
    }
    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                const response=await axios.get(`${base_url}/auth`,{
                    withCredentials:true
                })
                const data=await response.data
                setEmail(data.email)
            } catch (error) {
                navigate('/signin')
                console.log(error);
            }
        }
        fetchUser()
    },[])
    return (
        <div className="flex justify-between px-10 py-5">
            <div className="font-light text-2xl ">Medium</div>
            <div className="border px-3 py-1 text-white bg-black rounded-full">{email?.toString().charAt(0)}</div>
        </div>
    )
}
