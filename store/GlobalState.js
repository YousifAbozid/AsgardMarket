import { createContext, useEffect, useReducer } from "react"
import { getData } from "../utils/fetchData"
import { ACTIONS } from "./Actions"
import reducers from "./Reducers"

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const initialState = { notify: {}, auth: {}, cart: [], modal: {} }
    const [state, dispatch] = useReducer(reducers, initialState)
    const { cart } = state

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin")
        if (firstLogin) {
            getData("auth/accessToken").then((response) => {
                if (response.error) {
                    localStorage.removeItem("firstLogin")
                }

                dispatch({
                    type: ACTIONS.AUTH,
                    payload: {
                        token: response.accessToken,
                        user: response.user,
                    },
                })
            })
        }
    }, [])

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems"))
        if (cartItems) dispatch({ type: ACTIONS.ADD_CART, payload: cartItems })
    }, [])

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart))
    }, [cart])

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}
