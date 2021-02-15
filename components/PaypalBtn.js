import { useContext, useEffect, useRef } from "react"
import { patchData } from "../utils/fetchData"
import { ACTIONS } from "../store/Actions"
import { DataContext } from "../store/GlobalState"
import { updateItem } from "../store/Actions"

const paypalBtn = ({ order }) => {
    const refPaypalBtn = useRef()
    const { state, dispatch } = useContext(DataContext)
    const { auth, orders } = state

    useEffect(() => {
        paypal
            .Buttons({
                createOrder: function (data, actions) {
                    // This function sets up the details of the transaction, including the amount and line item details.
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: order.total,
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
                        patchData(`order/${order._id}`, null, auth.token).then(
                            (response) => {
                                if (response.error) {
                                    return dispatch({
                                        type: ACTIONS.NOTIFY,
                                        payload: { error: response.error },
                                    })
                                }

                                dispatch(
                                    updateItem(
                                        orders,
                                        order._id,
                                        {
                                            ...order,
                                            paid: true,
                                            dateOfPayment: new Date().toISOString(),
                                        },
                                        ACTIONS.ADD_ORDERS
                                    )
                                )

                                return dispatch({
                                    type: ACTIONS.NOTIFY,
                                    payload: { success: response.message },
                                })
                            }
                        )
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
