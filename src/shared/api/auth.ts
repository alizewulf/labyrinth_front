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

export async function loginUser(data: {
    email: string
    password: string
}) {
    const response = await API.post("/auth/login", data)

    return response.data
}

export async function getCurrentUser() {
    const response = await API.get("/users/me")
    return response.data
}