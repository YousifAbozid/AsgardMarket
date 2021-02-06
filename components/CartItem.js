import Link from "next/link"

const CartItem = ({ item, dispatch, cart }) => {
    return (
        <tr>
            <td style={{ width: "100px", overflow: "hidden" }}>
                <img
                    src={item.images[0].url}
                    alt={item.images[0].url}
                    className="img-thumbnail w-100"
                    style={{ minWidth: "80px", height: "80px" }}
                />
            </td>
            <td style={{ minWidth: "200px" }} className="w-50 align-middle">
                <h5 className="text-capitalize text-secondary">
                    <Link href={`/product/${item._id}`}>
                        <a>{item.title}</a>
                    </Link>
                </h5>
                <h6>${item.quantity * item.price}</h6>
                {item.inStock > 0 ? (
                    <p className="mb-1 text-danger">In Stock: {item.inStock}</p>
                ) : (
                    <p className="mb-1 text-muted">Out Stock</p>
                )}
            </td>
            <td className="align-middle" style={{ minWidth: "150px" }}>
                <button className="btn btn-outline-secondary"> + </button>
                <span className="px-3">{item.quantity}</span>
                <button className="btn btn-outline-secondary"> - </button>
            </td>
            <td
                className="align-middle"
                style={{ minWidth: "50px", cursor: "pointer" }}
            >
                <i
                    className="far fa-trash-alt text-danger"
                    aria-hidden="true"
                ></i>
            </td>
        </tr>
    )
}

export default CartItem
