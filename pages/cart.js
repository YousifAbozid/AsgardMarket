import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import CartItem from "../components/CartItem"
import { ACTIONS } from "../store/Actions"
import { DataContext } from "../store/GlobalState"
import { getData, postData } from "../utils/fetchData"

const Cart = () => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth, orders } = state
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState("")
    const [mobile, setMobile] = useState("")
    const [callback, setCallback] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const getTotal = () => {
            const result = cart.reduce((prev, item) => {
                return prev + item.price * item.quantity
            }, 0)

            setTotal(result)
        }

        getTotal()
    }, [cart])

    useEffect(() => {
        const cartLocal = JSON.parse(localStorage.getItem("cartItems"))
        if (cartLocal && cartLocal.length > 0) {
            let newArray = []
            const updateCart = async () => {
                for (const item of cartLocal) {
                    const response = await getData(`product/${item._id}`)
                    const {
                        _id,
                        title,
                        images,
                        price,
                        inStock,
                        sold,
                    } = response.product
                    if (inStock > 0) {
                        newArray.push({
                            _id,
                            title,
                            images,
                            price,
                            inStock,
                            sold,
                            quantity:
                                item.quantity > inStock ? 1 : item.quantity,
                        })
                    }
                }

                dispatch({ type: ACTIONS.ADD_CART, payload: newArray })
            }

            updateCart()
        }
    }, [callback])

    const handlePayment = async () => {
        if (!address) {
            return dispatch({
                type: ACTIONS.NOTIFY,
                payload: { error: "Please add your address." },
            })
        } else if (!mobile) {
            return dispatch({
                type: ACTIONS.NOTIFY,
                payload: { error: "Please add your mobile." },
            })
        }

        let newCart = []
        for (const item of cart) {
            const response = await getData(`product/${item._id}`)
            if (response.product.inStock - item.quantity >= 0) {
                newCart.push(item)
            }
        }

        if (newCart.length < cart.length) {
            setCallback(!callback)
            return dispatch({
                type: ACTIONS.NOTIFY,
                payload: {
                    error:
                        "The product is out of stock or the quantity is insufficient.",
                },
            })
        }

        dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })
        postData("order", { address, mobile, cart, total }, auth.token).then(
            (response) => {
                if (response.error) {
                    return dispatch({
                        type: ACTIONS.NOTIFY,
                        payload: { error: response.error },
                    })
                }
                dispatch({ type: ACTIONS.ADD_CART, payload: [] })

                const newOrder = {
                    ...response.newOrder,
                    user: auth.user,
                }
                dispatch({
                    type: ACTIONS.ADD_ORDERS,
                    payload: [...orders, newOrder],
                })
                dispatch({
                    type: ACTIONS.NOTIFY,
                    payload: { success: response.message },
                })

                return router.push(`/order/${response.newOrder._id}`)
            }
        )
    }

    if (cart.length === 0) {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Head>
                    <title>Asgard Market - Empty Cart!</title>
                </Head>
                <img
                    className="img-responsive"
                    style={{ marginTop: "50px", width: "40%" }}
                    src="/empty-cart.jpg"
                    alt="empty-shopping-cart"
                />
            </div>
        )
    }

    return (
        <div className="row mx-auto">
            <Head>
                <title>Asgard Market - Cart</title>
            </Head>
            <div className="col-md-8 my-3 text-secondary table-responsive">
                <h2 className="text-uppercase">Shopping Cart</h2>
                <table className="table my-3">
                    <tbody>
                        {cart.map((item) => (
                            <CartItem
                                key={item._id}
                                item={item}
                                dispatch={dispatch}
                                cart={cart}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="col-md-4 my-3 text-end text-uppercase text-secondary">
                <form>
                    <h2>Shipping</h2>

                    <label htmlFor="address">Address</label>
                    <input
                        id="address"
                        name="address"
                        type="address"
                        className="form-control mb-2"
                        value={address}
                        onChange={({ target }) => {
                            setAddress(target.value)
                            dispatch({ type: ACTIONS.NOTIFY, payload: {} })
                        }}
                    />

                    <label htmlFor="mobile">Mobile</label>
                    <input
                        id="mobile"
                        name="mobile"
                        type="mobile"
                        className="form-control mb-2"
                        value={mobile}
                        onChange={({ target }) => {
                            setMobile(target.value)
                            dispatch({ type: ACTIONS.NOTIFY, payload: {} })
                        }}
                    />

                    <h3>
                        Total: <span className="text-danger">${total}</span>
                    </h3>

                    <Link href={auth.user ? "#" : "/login"}>
                        <a
                            className="btn btn-dark my-2"
                            onClick={handlePayment}
                        >
                            Proceed to payment
                        </a>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Cart
