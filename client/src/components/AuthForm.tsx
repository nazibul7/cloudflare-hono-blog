import { AuthProp } from "../types";

export default function AuthForm({title,miniTitle,miniButton,button}:AuthProp) {
    return (
        <div className="h-screen mx-auto flex items-center justify-center max-w-[700px]">
            <div className="flex flex-col justify-center px-10 h-96 gap-3 w-[400px] md:w-1/2 ">
                <div className="text-center ">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-[13px]">{miniTitle}<span className="underline">{miniButton}</span></p>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold" htmlFor="email">Email</label>
                        <input className="border border-gray-400 rounded-md p-2" type="email" placeholder="Enter your email" id="email" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Password</label>
                        <input className="border border-gray-400 rounded-md p-2" type="password" placeholder="Enter your password" id="password" />
                    </div>
                </div>
                <div className="my-6 flex">
                    <button className="bg-black flex-1  text-white p-[10px] text-[18px] font-semibold rounded-md" type="submit">{button}</button>
                </div>
            </div>
            <div className="bg-slate-100 h-96 text-center w-1/2 hidden md:block">
                <div className="flex items-center h-full">
                    <p className="px-10">“Success is not final; failure is not fatal: It is the courage to continue that counts.” — <strong className="text-right">Winston Churchill</strong></p>
                </div>
            </div>
        </div>
    )
}
