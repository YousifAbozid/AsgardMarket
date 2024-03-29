import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useContext, useEffect } from "react"
import { ACTIONS, updateItem } from "../../store/Actions"
import { DataContext } from "../../store/GlobalState"
import { patchData } from "../../utils/fetchData"

const edit_user = () => {
    const { state, dispatch } = useContext(DataContext)
    const { auth, notify, users } = state
    const router = useRouter()
    const { id } = router.query
    const [editUser, setEditUser] = useState([])
    const [checkAdmin, setCheckAdmin] = useState(false)
    const [num, setNum] = useState(0)

    useEffect(() => {
        users.forEach((user) => {
            if (user._id === id) {
                setEditUser(user)
                setCheckAdmin(user.role === "admin" ? true : false)
            }
        })
    }, [users])

    const handleCheck = () => {
        setCheckAdmin(!checkAdmin)
        setNum(num + 1)
    }

    const handleUpdateProfile = async () => {
        let role = checkAdmin ? "admin" : "user"

        if (num % 2 !== 0) {
            dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })
            await patchData(`user/${editUser._id}`, { role }, auth.token).then(
                (response) => {
                    if (response.error) {
                        return dispatch({
                            type: ACTIONS.NOTIFY,
                            payload: { error: response.error },
                        })
                    }

                    setNum(0)

                    dispatch(
                        updateItem(
                            users,
                            editUser._id,
                            { ...editUser, role },
                            ACTIONS.ADD_USERS
                        )
                    )

                    return dispatch({
                        type: ACTIONS.NOTIFY,
                        payload: { success: response.message },
                    })
                }
            )
        }
    }

    return (
        <div className="edit_user my-3">
            <Head>
                <title>Asgard Market - Edit User</title>
            </Head>

            <div className="">
                <Link href="/users">
                    <i
                        className="fas fa-long-arrow-alt-left btn btn-dark"
                        aria-hidden="true"
                    >
                        {" "}
                        Go Back
                    </i>
                </Link>
            </div>
            <div className="col-md-4 mx-auto my-4">
                <h2 className="text-uppercase text-secondary">Edit User</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        name="name"
                        type="text"
                        defaultValue={editUser.name}
                        disabled
                        className="form-control"
                        onChange={({ target }) => {
                            setName(target.value)
                            dispatch({ type: ACTIONS.NOTIFY, payload: {} })
                        }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        name="email"
                        type="text"
                        defaultValue={editUser.email}
                        className="form-control"
                        disabled
                    />
                </div>

                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="isAdmin"
                        checked={checkAdmin}
                        onChange={handleCheck}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                    >
                        isAdmin
                    </label>
                </div>

                <div className="mb-3">
                    <button
                        className="btn btn-dark"
                        disabled={notify.loading}
                        type="submit"
                        onClick={handleUpdateProfile}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default edit_user
