import Head from "next/head"
import Image from "next/image"
import { useContext } from "react"
import { DataContext } from "../store/GlobalState"

const Cart = () => {
    const { state, dispatch } = useContext(DataContext)
    const { cart } = state

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
        <div>
            <Head>
                <title>Asgard Market - Cart</title>
            </Head>
            <h1>cart</h1>
        </div>
    )
}

export default Cart
