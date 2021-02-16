import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useContext, useEffect } from "react"
import { DataContext } from "../../store/GlobalState"
import OrderDetail from "../../components/OrderDetail"

const detailOrder = () => {
    const { state, dispatch } = useContext(DataContext)
    const { orders, auth } = state
    const router = useRouter() // router.back() to go back
    const [orderDetails, setOrderDetails] = useState([])

    useEffect(() => {
        const newArray = orders.filter((order) => order._id === router.query.id)
        setOrderDetails(newArray)
    }, [orders])

    if (!auth.user) return null

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
            <OrderDetail orderDetails={orderDetails} />
        </div>
    )
}

export default detailOrder
