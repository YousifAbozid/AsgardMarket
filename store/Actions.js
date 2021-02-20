export const ACTIONS = {
    NOTIFY: "NOTIFY",
    AUTH: "AUTH",
    ADD_CART: "ADD_CART",
    ADD_MODAL: "ADD_MODAL",
    ADD_ORDERS: "ADD_ORDERS",
    ADD_USERS: "ADD_USERS",
    ADD_CATEGORIES: "ADD_CATEGORIES",
    DELETE_PRODUCT: "DELETE_PRODUCT",
    DELETE_ALL_PRODUCTS: "DELETE_ALL_PRODUCTS",
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

export const deleteItem = (data, id, type) => {
    const newData = data.filter((item) => item._id !== id)
    return { type, payload: newData }
}

export const updateItem = (data, id, post, type) => {
    const newData = data.map((item) => (item._id === id ? post : item))
    return { type, payload: newData }
}
