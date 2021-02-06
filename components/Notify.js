import { useContext } from "react"
import { DataContext } from "../store/GlobalState"
import Toast from "./Toast"
import Loading from "./Loading"
import { ACTIONS } from "../store/Actions"

const Notify = () => {
    const { state, dispatch } = useContext(DataContext)
    const { notify } = state

    return (
        <>
            {notify.loading && <Loading />}
            {notify.error && (
                <Toast
                    handleShow={() =>
                        dispatch({ type: ACTIONS.NOTIFY, payload: {} })
                    }
                    message={{ title: "Error", body: notify.error }}
                    bgColor="bg-danger"
                />
            )}
            {notify.success && (
                <Toast
                    handleShow={() =>
                        dispatch({ type: ACTIONS.NOTIFY, payload: {} })
                    }
                    message={{ title: "Success", body: notify.success }}
                    bgColor="bg-success"
                />
            )}
        </>
    )
}

export default Notify
