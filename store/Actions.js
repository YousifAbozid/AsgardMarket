export const ACTIONS = {
    NOTIFY: "NOTIFY",
    AUTH: "AUTH",
    ADD_CART: "ADD_CART",
    ADD_MODAL: "ADD_MODAL",
    ADD_ORDERS: "ADD_ORDERS",
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

export const increase = (cart, id) => {
    const updatedCart = [...cart]
    updatedCart.forEach((item) => {
        if (item._id === id) {
            item.quantity += 1
        }
    })

    return { type: ACTIONS.ADD_CART, payload: updatedCart }
}

export const decrease = (cart, id) => {
    const updatedCart = [...cart]
    updatedCart.forEach((item) => {
        if (item._id === id) {
            item.quantity -= 1
        }
    })

    return { type: ACTIONS.ADD_CART, payload: updatedCart }
}

export const deleteItem = (cart, id, type) => {
    const newCart = cart.filter((item) => item._id !== id)
    return { type, payload: newCart }
}
