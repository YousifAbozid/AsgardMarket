export const ACTIONS = {
    NOTIFY: "NOTIFY",
    AUTH: "AUTH",
    ADD_CART: "ADD_CART",
}

export const addToCart = (product, cart) => {
    if (product.inStock === 0) {
        return {
            type: ACTIONS.NOTIFY,
            payload: { error: "This product is out of stock." },
        }
    }

    const check = cart.every((item) => {
        return item._id !== product._id
    })
    if (!check) {
        return {
            type: ACTIONS.NOTIFY,
            payload: { error: "This product is already in your cart." },
        }
    }

    return {
        type: ACTIONS.ADD_CART,
        payload: [...cart, { ...product, quantity: 1 }],
    }
}
