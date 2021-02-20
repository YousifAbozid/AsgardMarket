import Link from "next/link"
import { useContext } from "react"
import { DataContext } from "../../store/GlobalState"
import { ACTIONS, addToCart } from "../../store/Actions"

const ProductItem = ({ product }) => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state

    const userLink = () => {
        return (
            <>
                <Link href={`/product/${product._id}`}>
                    <a
                        className="btn btn-info"
                        style={{ marginRight: "5px", flex: 1 }}
                    >
                        View
                    </a>
                </Link>
                <button
                    className="btn btn-success"
                    style={{ marginLeft: "5px", flex: 1 }}
                    disabled={product.inStock === 0 ? true : false}
                    onClick={() => dispatch(addToCart(product, cart))}
                >
                    Buy
                </button>
            </>
        )
    }

    const adminLink = () => {
        return (
            <>
                <Link href={`/product/${product._id}`}>
                    <a
                        className="btn btn-info"
                        style={{ marginRight: "5px", flex: 1 }}
                    >
                        View
                    </a>
                </Link>
                <Link href={`/create/${product._id}`}>
                    <a className="btn btn-primary" style={{ flex: 1 }}>
                        Edit
                    </a>
                </Link>
                <button
                    className="btn btn-danger"
                    style={{ marginLeft: "5px", flex: 1 }}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() =>
                        dispatch({
                            type: ACTIONS.ADD_MODAL,
                            payload: {
                                data: "",
                                title: product.title,
                                id: product._id,
                                type: ACTIONS.DELETE_PRODUCT,
                                toDelete: "Product",
                            },
                        })
                    }
                >
                    Delete
                </button>
            </>
        )
    }

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img
                src={product.images[0].url}
                className="card-img-top"
                alt={product.images[0].url}
            />
            <div className="card-body">
                <h5
                    className="card-title text-capitalize"
                    title={product.title}
                >
                    {product.title}
                </h5>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <h6 className="text-danger" title={`$${product.price}`}>
                        ${product.price}
                    </h6>
                    {product.inStock > 0 ? (
                        <h6
                            className="text-danger"
                            title={`${product.inStock} Pcs`}
                        >
                            In Stock: {product.inStock}
                        </h6>
                    ) : (
                        <h6 className="text-muted" title="Out Stock">
                            Out Stock
                        </h6>
                    )}
                </div>
                <p className="card-text" title={product.description}>
                    {product.description}
                </p>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    {!auth.user || auth.user.role !== "admin"
                        ? userLink()
                        : adminLink()}
                </div>
            </div>
        </div>
    )
}

export default ProductItem
