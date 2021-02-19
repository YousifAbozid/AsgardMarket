import Head from "next/head"
import { useState, useContext, useEffect } from "react"
import { getData } from "../../utils/fetchData"
import { DataContext } from "../../store/GlobalState"
import { ACTIONS, addToCart } from "../../store/Actions"
import Link from "next/link"

const DetailProduct = (props) => {
    const [product] = useState(props.product)
    const [tab, setTab] = useState(0)
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state

    const isActive = (index) => {
        if (index === tab) return "active"
        return ""
    }

    // -------------- to handle none existing product
    useEffect(() => {
        if (props.error) {
            dispatch({
                type: ACTIONS.NOTIFY,
                payload: { error: props.error },
            })
        }
    }, [])

    if (product === null) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "20px",
                }}
            >
                <Head>
                    <title>Asgard Market - No Product</title>
                </Head>
                <h1>Ops, nothing here 😵</h1>
            </div>
        )
    }
    // ------------------

    // this useEffect is equal to isActive function, smart solution for real.
    // const imageRef = useRef()
    // useEffect(() => {
    //     const images = imageRef.current.children
    //     for (let i = 0; i < images.length; i++) {
    //         images[i].className = images[i].className.replace(
    //             "active",
    //             "img-thumbnail rounded"
    //         )
    //     }

    //     images[tab].className = "img-thumbnail rounded active"
    // }, [tab])

    return (
        <div className="row detail_page">
            <Head>
                <title>Asgard Market - Product Details</title>
            </Head>
            <div className="col-md-6">
                <img
                    src={product.images[tab].url}
                    alt={product.images[tab].url}
                    className="d-block img-thumbnail rounded mt-4 w-100"
                    style={{ height: "350px" }}
                />
                <div className="row mx-0">
                    {product.images.map((image, index) => (
                        <img
                            key={index}
                            src={image.url}
                            alt={image.url}
                            className={`img-thumbnail rounded ${isActive(
                                index
                            )}`}
                            style={{
                                height: "80px",
                                width: "20%",
                                cursor: "pointer",
                            }}
                            onClick={() => setTab(index)}
                        />
                    ))}
                </div>
            </div>

            <div className="col-md-6 mt-3">
                <h2 className="text-uppercase">{product.title}</h2>
                <h5 className="text-danger">${product.price}</h5>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    {product.inStock > 0 ? (
                        <h6 className="text-danger">
                            In Stock: {product.inStock}
                        </h6>
                    ) : (
                        <h6 className="text-danger">Out Stock</h6>
                    )}
                    <h6 className="text-danger">Sold: {product.sold}</h6>
                </div>
                <div className="my-2">{product.description}</div>
                <div className="my-2">{product.content}</div>
                {!auth.user || auth.user.role !== "admin" ? (
                    <button
                        className="btn btn-dark d-block my-3 px-5"
                        disabled={product.inStock === 0 ? true : false}
                        onClick={() => dispatch(addToCart(product, cart))}
                    >
                        Add To Cart
                    </button>
                ) : (
                    <Link href={`/create/${product._id}`}>
                        <a className="btn btn-primary my-3 px-5">Edit</a>
                    </Link>
                )}
            </div>
        </div>
    )
}

export async function getServerSideProps({ params: { id } }) {
    // this is server side rendering so it will print in the console here only not in the browser
    const response = await getData(`product/${id}`)

    // adding || null beacuse next.js can't handle undefiened in parsing to an object
    // javascript can handle it with JSON.parse() without any problems
    // you can read this discussion for more info: https://github.com/vercel/next.js/discussions/11209
    return {
        props: {
            product: response.product || null,
            error: response.error || null,
        },
    }
}

export default DetailProduct
