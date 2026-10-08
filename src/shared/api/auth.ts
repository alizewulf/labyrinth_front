import { API } from "./axios"

export async function registerUser(data: {
    name: string
    surname: string
    phone: string
    email: string
    password: string
}) {
    const response = await API.post("/auth/register", data)

    return response.data
}