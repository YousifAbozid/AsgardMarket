import { useContext } from "react"
import { DataContext } from "../store/GlobalState"
import { ACTIONS, deleteItem } from "../store/Actions"
import { deleteData } from "../utils/fetchData"

const Modal = () => {
    const { state, dispatch } = useContext(DataContext)
    const { modal, auth } = state

    const handleDelete = async () => {
        if (modal.type === ACTIONS.ADD_USERS) {
            dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })

            await deleteData(`user/${modal.id}`, auth.token).then(
                (response) => {
                    if (response.error) {
                        return dispatch({
                            type: ACTIONS.NOTIFY,
                            payload: { error: response.error },
                        })
                    }

                    return dispatch({
                        type: ACTIONS.NOTIFY,
                        payload: { success: response.message },
                    })
                }
            )
        }

        if (modal.type === ACTIONS.ADD_CATEGORIES) {
            dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })

            await deleteData(`categories/${modal.id}`, auth.token).then(
                (response) => {
                    if (response.error) {
                        return dispatch({
                            type: ACTIONS.NOTIFY,
                            payload: { error: response.error },
                        })
                    }

                    return dispatch({
                        type: ACTIONS.NOTIFY,
                        payload: { success: response.message },
                    })
                }
            )
        }

        dispatch(deleteItem(modal.data, modal.id, modal.type))
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
                        Are you sure you want to delete this {modal.toDelete}?
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
