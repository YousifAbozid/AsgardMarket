import Head from "next/head"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../store/GlobalState"

const profile = () => {
    const { state, dispatch } = useContext(DataContext)
    const { auth, notify } = state
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [password, setPassword] = useState("")
    const [cfPassword, setCfPassword] = useState("")

    useEffect(() => {
        if (auth.user) {
            setName(auth.user.name)
        }
    }, [auth])

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
                            ? "User Profile"
                            : "Admin Profile"}
                    </h3>
                    <div className="avatar">
                        <img
                            src={auth.user.avatar}
                            alt={auth.user.avatar}
                            style={{ width: "100px", height: "100px" }}
                        />
                        <span>
                            <i className="fas fa-camera"></i>
                            <p>Change</p>
                            <input type="file" name="file" id="file_up" />
                        </span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            name="name"
                            type="text"
                            value={name}
                            placeholder="Your Name"
                            className="form-control"
                            onChange={({ target }) => setName(target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            type="text"
                            defaultValue={auth.user.email}
                            className="form-control"
                            disabled="true"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input
                            name="password"
                            type="password"
                            value={password}
                            placeholder="Your New Password"
                            className="form-control"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cfPassword">Confirm New Password</label>
                        <input
                            name="password1"
                            type="password"
                            value={cfPassword}
                            placeholder="Confirm New Password"
                            className="form-control"
                            onChange={({ target }) =>
                                setCfPassword(target.value)
                            }
                        />
                    </div>
                    <button className="btn btn-info" disabled={notify.loading}>
                        Update
                    </button>
                </div>
                <div className="col-md-8">
                    <h3>Orders</h3>
                </div>
            </section>
        </div>
    )
}

export default profile
