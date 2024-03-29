import { useContext } from "react"
import { DataContext } from "../store/GlobalState"
import { ACTIONS, deleteItem } from "../store/Actions"
import { deleteData } from "../utils/fetchData"

const Modal = () => {
    const { state, dispatch } = useContext(DataContext)
    const { modal, auth } = state

    const handleDelete = () => {
        if (modal.type === ACTIONS.ADD_CART) {
            dispatch(deleteItem(modal.data, modal.id, modal.type))
        }

        if (modal.type === ACTIONS.ADD_USERS) {
            dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })

            deleteData(`user/${modal.id}`, auth.token).then((response) => {
                if (response.error) {
                    return dispatch({
                        type: ACTIONS.NOTIFY,
                        payload: { error: response.error },
                    })
                }
                dispatch(deleteItem(modal.data, modal.id, modal.type))

                return dispatch({
                    type: ACTIONS.NOTIFY,
                    payload: { success: response.message },
                })
            })
        }

        if (modal.type === ACTIONS.ADD_CATEGORIES) {
            dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })

            deleteData(`categories/${modal.id}`, auth.token).then(
                (response) => {
                    if (response.error) {
                        return dispatch({
                            type: ACTIONS.NOTIFY,
                            payload: { error: response.error },
                        })
                    }
                    dispatch(deleteItem(modal.data, modal.id, modal.type))

                    return dispatch({
                        type: ACTIONS.NOTIFY,
                        payload: { success: response.message },
                    })
                }
            )
        }

        if (modal.type === ACTIONS.DELETE_PRODUCT) {
            dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })

            deleteData(`product/${modal.id}`, auth.token).then((response) => {
                if (response.error) {
                    return dispatch({
                        type: ACTIONS.NOTIFY,
                        payload: { error: response.error },
                    })
                }

                dispatch({
                    type: ACTIONS.NOTIFY,
                    payload: { success: response.message },
                })

                // this timer will reload the page after 2 seconds to give a chance to
                // the admin to see the success message
                setTimeout(() => {
                    location.reload()
                }, 1000 * 2)
            })
        }

        if (modal.type === ACTIONS.DELETE_ALL_PRODUCTS) {
            dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })

            deleteData("product", auth.token).then((response) => {
                if (response.error) {
                    return dispatch({
                        type: ACTIONS.NOTIFY,
                        payload: { error: response.error },
                    })
                }

                dispatch({
                    type: ACTIONS.NOTIFY,
                    payload: { success: response.message },
                })

                // this timer will reload the page after 2 seconds to give a chance to
                // the root to see the success message
                setTimeout(() => {
                    location.reload()
                }, 1000 * 2)
            })
        }

        dispatch({ type: ACTIONS.ADD_MODAL, payload: {} })
    }

    return (
        <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5
                            className="modal-title text-capitalize"
                            id="staticBackdropLabel"
                        >
                            {modal.title}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() =>
                                dispatch({
                                    type: ACTIONS.ADD_MODAL,
                                    payload: {},
                                })
                            }
                        ></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete{" "}
                        {modal.type === ACTIONS.DELETE_ALL_PRODUCTS
                            ? ""
                            : "this "}
                        {modal.toDelete}?
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={() =>
                                dispatch({
                                    type: ACTIONS.ADD_MODAL,
                                    payload: {},
                                })
                            }
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={handleDelete}
                        >
                            I'm Sure
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
