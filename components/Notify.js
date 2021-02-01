import { useContext } from "react"
import { DataContext } from "../store/GlobalState"
import Toast from "./Toast"
import Loading from "./Loading"

const Notify = () => {
    const [state, dispatch] = useContext(DataContext)
    const { notify } = state

    return (
        <>
            {notify.loading && <Loading />}
            {notify.error && <Toast />}
            {notify.success && <Toast />}
        </>
    )
}

export default Notify
