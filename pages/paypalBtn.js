import { useEffect, useRef } from "react"
import { postData } from "../utils/fetchData"
import { ACTIONS } from "../store/Actions"

const paypalBtn = ({ total, address, mobile, state, dispatch }) => {
    const refPaypalBtn = useRef()
    const { auth, cart, orders } = state

    useEffect(() => {
        paypal
            .Buttons({
                createOrder: function (data, actions) {
                    // This function sets up the details of the transaction, including the amount and line item details.
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: total,
                                },
                            },
                        ],
                    })
                },
                onApprove: function (data, actions) {
                    dispatch({
                        type: ACTIONS.NOTIFY,
                        payload: { loading: true },
                    })
                    // This function captures the funds from the transaction.
                    return actions.order.capture().then(function (details) {
                        // This function shows a transaction success message to your buyer.
                        postData(
                            "order",
                            { address, mobile, cart, total },
                            auth.token
                        ).then((response) => {
                            if (response.error) {
                                return dispatch({
                                    type: ACTIONS.NOTIFY,
                                    payload: { error: response.error },
                                })
                            }
                            const newOrder = {
                                ...response.newOrder,
                                user: auth.user,
                            }

                            dispatch({ type: ACTIONS.ADD_CART, payload: [] })
                            dispatch({
                                type: ACTIONS.ADD_ORDERS,
                                payload: [...orders, newOrder],
                            })
                            return dispatch({
                                type: ACTIONS.NOTIFY,
                                payload: { success: response.message },
                            })
                        })
                    })
                },
                onError: (error) => {
                    console.log("Error: ", error)
                    return dispatch({
                        type: ACTIONS.NOTIFY,
                        payload: {
                            error:
                                "Transaction can't be completed, please check your bank.",
                        },
                    })
                },
            })
            .render(refPaypalBtn.current)
        //This function displays Smart Payment Buttons on your web page.
    }, [])

    return <div ref={refPaypalBtn}></div>
}

export default paypalBtn
