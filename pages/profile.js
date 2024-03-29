import Head from "next/head"
import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { ACTIONS } from "../store/Actions"
import { DataContext } from "../store/GlobalState"
import { patchData } from "../utils/fetchData"
import valid from "../utils/valid"
import { imageUpload } from "../utils/imageUpload"

const profile = () => {
    const { state, dispatch } = useContext(DataContext)
    const { auth, notify, orders } = state
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [password, setPassword] = useState("")
    const [cfPassword, setCfPassword] = useState("")

    useEffect(() => {
        if (auth.user) {
            setName(auth.user.name)
        }
    }, [auth])

    const handleUpdateProfile = (event) => {
        event.preventDefault()
        if (password) {
            const errorMessage = valid(
                name,
                auth.user.email,
                password,
                cfPassword
            )
            if (errorMessage) {
                return dispatch({
                    type: ACTIONS.NOTIFY,
                    payload: { error: errorMessage },
                })
            }
            updatePassword()
        }

        if (name !== auth.user.name || avatar) uploadInfo()
    }

    const updatePassword = () => {
        dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })
        patchData("user/resetPassword", { password }, auth.token).then(
            (response) => {
                if (response.error) {
                    return dispatch({
                        type: ACTIONS.NOTIFY,
                        payload: { error: response.error },
                    })
                }
                setPassword("")
                setCfPassword("")
                return dispatch({
                    type: ACTIONS.NOTIFY,
                    payload: { success: response.message },
                })
            }
        )
    }

    const changeAvatar = ({ target }) => {
        const file = target.files[0]
        if (!file) {
            return dispatch({
                type: ACTIONS.NOTIFY,
                payload: { error: "File does not exist." },
            })
        }
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
            return dispatch({
                type: ACTIONS.NOTIFY,
                payload: { error: "Image format is incorrect." },
            })
        }
        // 1024 * 1024 * 2 = 2mb
        if (file.size > 1024 * 1024 * 2) {
            return dispatch({
                type: ACTIONS.NOTIFY,
                payload: { error: "Select an image not bigger than 2MB." },
            })
        }
        setAvatar(file)
    }

    const uploadInfo = async () => {
        let media
        dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })
        if (avatar) {
            media = await imageUpload([avatar])
        }

        patchData(
            "user",
            { name, avatar: avatar ? media[0].url : auth.user.avatar },
            auth.token
        ).then((response) => {
            if (response.error) {
                return dispatch({
                    type: ACTIONS.NOTIFY,
                    payload: { error: response.error },
                })
            }
            dispatch({
                type: ACTIONS.AUTH,
                payload: { token: auth.token, user: response.user },
            })
            return dispatch({
                type: ACTIONS.NOTIFY,
                payload: { success: response.message },
            })
        })
    }

    if (!auth.user) return null

    return (
        <div className="profile_page">
            <Head>
                <title>Asgard Market - Profile</title>
            </Head>

            <section className="row text-secondary my-3">
                <div className="col-md-4">
                    <h3 className="text-center text-uppercase">
                        {auth.user.role === "user"
                            ? `${auth.user.name}'s Profile`
                            : `${auth.user.name}'s Profile ✅`}
                    </h3>
                    <div className="avatar">
                        <img
                            src={
                                avatar
                                    ? URL.createObjectURL(avatar)
                                    : auth.user.avatar
                            }
                            alt="avatar"
                        />
                        <span>
                            <i className="fas fa-camera"></i>
                            <p>Change</p>
                            <input
                                id="formFile"
                                name="file"
                                type="file"
                                accept="image/*"
                                onChange={changeAvatar}
                            />
                        </span>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            name="name"
                            type="text"
                            value={name}
                            placeholder="Your Name"
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
                            defaultValue={auth.user.email}
                            className="form-control"
                            disabled={true}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            New Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            value={password}
                            placeholder="Your New Password"
                            className="form-control"
                            onChange={({ target }) => {
                                setPassword(target.value)
                                dispatch({ type: ACTIONS.NOTIFY, payload: {} })
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cfPassword" className="form-label">
                            Confirm New Password
                        </label>
                        <input
                            name="password1"
                            type="password"
                            value={cfPassword}
                            placeholder="Confirm New Password"
                            className="form-control"
                            onChange={({ target }) => {
                                setCfPassword(target.value)
                                dispatch({ type: ACTIONS.NOTIFY, payload: {} })
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <button
                            className="btn btn-info"
                            disabled={notify.loading}
                            type="submit"
                            onClick={handleUpdateProfile}
                        >
                            Update
                        </button>
                    </div>
                </div>

                <div className="col-md-8">
                    <h3 className="text-uppercase">Orders</h3>
                    <div className="my-3 table-responsive">
                        <table
                            className="table-bordered table-hover w-100 text-uppercase"
                            style={{ minWidth: "600px" }}
                        >
                            <thead className="bg-light font-weight-bold">
                                <tr>
                                    <td className="p-2">id</td>
                                    <td className="p-2">date</td>
                                    <td className="p-2">total</td>
                                    <td className="p-2">delivered</td>
                                    <td className="p-2">Paid</td>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td className="p-2">
                                            <Link href={`/order/${order._id}`}>
                                                {order._id}
                                            </Link>
                                        </td>
                                        <td className="p-2">
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="p-2">${order.total}</td>
                                        <td className="p-2">
                                            {order.delivered ? (
                                                <i className="fas fa-check text-success"></i>
                                            ) : (
                                                <i className="fas fa-times text-danger"></i>
                                            )}
                                        </td>
                                        <td className="p-2">
                                            {order.paid ? (
                                                <i className="fas fa-check text-success"></i>
                                            ) : (
                                                <i className="fas fa-times text-danger"></i>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default profile
