import z from "zod"
export const UserAuthSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password length should be minimun of 6")
})

export type UserAuthType = z.infer<typeof UserAuthSchema>
export type ReceviedPropType= UserAuthType & {
    id :number
    token:string
}

export type AuthProp = {
    title: string
    miniTitle: string
    miniButton: string
    button: string
    handleSubmit: (data: UserAuthType) => void
}
