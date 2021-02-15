import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useContext, useEffect } from "react"
import { DataContext } from "../../store/GlobalState"

const detailOrder = () => {
    const { state, dispatch } = useContext(DataContext)
    const { orders, auth } = state
    const router = useRouter() // router.back() to go back
    const [orderDetails, setOrderDetails] = useState([])

    useEffect(() => {
        const newArray = orders.filter((order) => order._id === router.query.id)
        setOrderDetails(newArray)
    }, [orders])

    return (
        <div className="my-3">
            <Head>
                <title>Asgard Market - Order Details</title>
            </Head>
            <div>
                <Link href="/profile">
                    <i
                        className="fas fa-long-arrow-alt-left btn btn-dark"
                        aria-hidden="true"
                    >
                        {" "}
                        Go Back
                    </i>
                </Link>
            </div>
            <div style={{ maxWidth: "600px", margin: "20px auto" }}>
                {orderDetails.map((order) => (
                    <div key={order._id} className="text-uppercase my-3">
                        <h2 className="text-break">Order {order._id}</h2>
                        <div className="mt-4 text-secondary">
                            <h4>Shipping</h4>
                            <p>Name: {order.user.name}</p>
                            <p>Email: {order.user.email}</p>
                            <p>Address: {order.address}</p>
                            <p>Mobile: {order.mobile}</p>

                            <div
                                className={`alert ${
                                    order.delivered
                                        ? "alert-success"
                                        : "alert-danger"
                                } d-flex justify-content-between align-items-center`}
                                role="alert"
                            >
                                {order.delivered
                                    ? `Delivered At ${order.updatedAt}`
                                    : "Not Delivered yet"}
                            </div>
                            <div>
                                <h4>Order Items</h4>
                                {order.cart.map((item) => (
                                    <div
                                        key={item._id}
                                        className="border-bottom mx-0 p-2 align-items-center"
                                        style={{
                                            maxWidth: "550px",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <img
                                            src={item.images[0].url}
                                            alt={item.images[0].url}
                                            style={{
                                                width: "50px",
                                                height: "45px",
                                                objectFit: "cover",
                                            }}
                                        />
                                        <h5 className="flex-fill text-secondary px-3 m-0">
                                            <Link href={`/product/${item._id}`}>
                                                <a>{item.title}</a>
                                            </Link>
                                        </h5>
                                        <span className="text-info m-0">
                                            {item.quantity} x {item.price} = $
                                            {item.price * item.quantity}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default detailOrder
