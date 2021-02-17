import Head from "next/head"
import { useContext, useState } from "react"
import { ACTIONS } from "../store/Actions"
import { DataContext } from "../store/GlobalState"
import { postData } from "../utils/fetchData"

const categories = () => {
    const { state, dispatch } = useContext(DataContext)
    const { categories, auth } = state
    const [name, setName] = useState("")

    const createCategory = async () => {
        if (auth.user.role !== "admin") {
            return dispatch({
                type: ACTIONS.NOTIFY,
                payload: { error: "Unauthorized you are not an admin." },
            })
        }
        if (!name) {
            return dispatch({
                type: ACTIONS.NOTIFY,
                payload: { error: "Name can't be empty." },
            })
        }
        dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })

        const response = await postData("categories", { name }, auth.token)
        if (response.error) {
            return dispatch({
                type: ACTIONS.NOTIFY,
                payload: { error: response.error },
            })
        }

        dispatch({
            type: ACTIONS.ADD_CATEGORIES,
            payload: [...categories, response.newCategory],
        })
        return dispatch({
            type: ACTIONS.NOTIFY,
            payload: { success: response.message },
        })
    }

    if (!auth.user) return null

    return (
        <div className="col-md-6 mx-auto my-3">
            <Head>
                <title>Asgard Market - Categories</title>
            </Head>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    placeholder="Add a new category"
                    aria-label="Add a new category"
                />
                <button
                    className="btn btn-outline-secondary"
                    type="submit"
                    style={{ marginLeft: "10px" }}
                    onClick={createCategory}
                >
                    Add
                </button>
            </div>

            {categories.map((category) => (
                <div key={category._id} className="card my-2 text-capitalize">
                    <div className="card-body d-flex justify-content-between">
                        <div className="card-title">{category.name}</div>

                        <div>
                            <i
                                className="fas fa-edit text-info"
                                style={{
                                    cursor: "pointer",
                                    marginRight: "20px",
                                }}
                            />
                            <i
                                className="fas fa-trash text-danger"
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default categories
