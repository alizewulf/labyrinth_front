"use client"
import { store } from "@/store/index"
import { Provider } from "react-redux"

export default function StoreProvider({children}:{children:React.ReactNode}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}