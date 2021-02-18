import Head from "next/head"
import { useContext, useState } from "react"
import { ACTIONS } from "../../store/Actions"
import { DataContext } from "../../store/GlobalState"

const ProductsManager = () => {
    const { state, dispatch } = useContext(DataContext)
    const { auth, categories } = state

    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [inStock, setInStock] = useState(0)
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")

    if (!auth.user) return null

    return (
        <div className="products_manager">
            <Head>
                <title>Asgard Market - Products Manager</title>
            </Head>

            <form className="row">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control d-block my-3 w-100 p-2"
                        placeholder="Product ID"
                        value={id}
                        onChange={({ target }) => {
                            setId(target.value)
                            dispatch({ type: ACTIONS.NOTIFY, payload: {} })
                        }}
                    />

                    <input
                        type="text"
                        className="form-control d-block my-3 w-100 p-2"
                        placeholder="Title"
                        value={title}
                        onChange={({ target }) => {
                            setTitle(target.value)
                            dispatch({ type: ACTIONS.NOTIFY, payload: {} })
                        }}
                    />

                    <div className="row" style={{ margin: "-25px" }}>
                        <div
                            className="col-sm-6"
                            style={{
                                marginRight: "0px",
                                paddingLeft: "23px",
                                paddingRight: "23px",
                            }}
                        >
                            <input
                                type="number"
                                className="form-control d-block my-3 w-100 p-2"
                                placeholder="Price"
                                value={price}
                                onChange={({ target }) => {
                                    setPrice(target.value)
                                    dispatch({
                                        type: ACTIONS.NOTIFY,
                                        payload: {},
                                    })
                                }}
                            />
                        </div>
                        <div
                            className="col-sm-6"
                            style={{
                                marginLeft: "0px",
                                paddingRight: "23px",
                                paddingLeft: "23px",
                            }}
                        >
                            <input
                                type="number"
                                className="form-control d-block my-3 w-100 p-2"
                                placeholder="In Stock"
                                value={inStock}
                                onChange={({ target }) => {
                                    setInStock(target.value)
                                    dispatch({
                                        type: ACTIONS.NOTIFY,
                                        payload: {},
                                    })
                                }}
                            />
                        </div>
                    </div>

                    <textarea
                        className="form-control d-block my-3 w-100 p-2"
                        rows="2"
                        cols="30"
                        placeholder="Description"
                        value={description}
                        onChange={({ target }) => {
                            setDescription(target.value)
                            dispatch({
                                type: ACTIONS.NOTIFY,
                                payload: {},
                            })
                        }}
                    />
                    <textarea
                        className="form-control d-block my-3 w-100 p-2"
                        rows="4"
                        cols="30"
                        placeholder="Content"
                        value={content}
                        onChange={({ target }) => {
                            setContent(target.value)
                            dispatch({
                                type: ACTIONS.NOTIFY,
                                payload: {},
                            })
                        }}
                    />
                    <div className="input-group-prepend px-0 my-2">
                        <select
                            className="form-select text-capitalize"
                            aria-label="Default select example"
                            value={category}
                            onChange={({ target }) => {
                                setCategory(target.value)
                                dispatch({
                                    type: ACTIONS.NOTIFY,
                                    payload: {},
                                })
                            }}
                        >
                            <option value="">All Products</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProductsManager
