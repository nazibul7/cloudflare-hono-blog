import React, { useState } from "react";
import { AuthProp, UserAuthSchema } from "../types";
import { ZodError } from "zod";

export default function AuthForm({ title, miniTitle, miniButton, button, errorMessage, handleSubmit }: AuthProp) {
    const [data, setData] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)
   
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [event.target.name]: event.target.value })
        setErrors({ ...errors, [event.target.name]: '' })
    }
    const onClickhandler = async () => {
        try {
            const parseData = UserAuthSchema.parse(data)
            setLoading(true)
            await handleSubmit(parseData)
        } catch (error) {
            if (error instanceof ZodError) {
                const newErrors = { email: '', password: '' }
                error.errors.forEach(err => {
                    newErrors[err.path[0] as "email" | "password"] = err.message
                })
                setErrors({ email: newErrors.email || "", password: newErrors.password || "" })
            }
        }
        finally {
            setLoading(false)
        }
    }
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
                        <input name="email" value={data.email} onChange={onChangeHandler} className="border border-gray-400 rounded-md p-2" type="email" placeholder="Enter your email" id="email" />
                        {errors.email && <span className="text-red-500 text-xs mt-[-7px]">{errors.email}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Password</label>
                        <input name="password" value={data.password} onChange={onChangeHandler} className="border border-gray-400 rounded-md p-2" type="password" placeholder="Enter your password" id="password" />
                        {errors.password && <span className="text-red-500 text-xs mt-[-7px]" >{errors.password}</span>}
                    </div>
                </div>
                <div>
                    {errorMessage && <div className="text-red-500 text-sm mb-[-10px]">{errorMessage}</div>}
                </div>
                <div className="my-6 flex">
                    <button onClick={onClickhandler} className="bg-black flex-1 text-white p-[10px] text-[18px] font-semibold rounded-md" type="submit">{loading ? 'Loading...' : button}</button>
                </div>
            </div>
            <div className="my-6 flex"></div>
            <div className="bg-slate-100 h-96 text-center w-1/2 hidden md:block">
                <div className="flex items-center h-full">
                    <p className="px-10">“Success is not final; failure is not fatal: It is the courage to continue that counts.” — <strong className="text-right">Winston Churchill</strong></p>
                </div>
            </div>
        </div>
    )
}
