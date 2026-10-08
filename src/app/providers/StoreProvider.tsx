"use client"
import { store } from "@/store/index"
import { Provider } from "react-redux"

export default async function StoreProvider({children}:{children:React.ReactNode}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}