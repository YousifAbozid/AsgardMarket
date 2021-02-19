import Head from "next/head"
import Link from "next/link"
import { useContext } from "react"
import { ACTIONS } from "../store/Actions"
import { DataContext } from "../store/GlobalState"

const users = () => {
    const { state, dispatch } = useContext(DataContext)
    const { users, auth } = state

    if (!auth.user) return null

    return (
        <div className="table-responsive">
            <Head>
                <title>Asgard Market - Users</title>
            </Head>

            {/* TODO Go Back Button */}
            <table className="table w-100">
                <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <th>{index + 1}</th>
                            <th>{user._id}</th>
                            <th>
                                <img
                                    src={user.avatar}
                                    alt={user.avatar}
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        overflow: "hidden",
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                    }}
                                />
                            </th>
                            <th>{user.name}</th>
                            <th>{user.email}</th>
                            <th>
                                {user.role === "admin" ? (
                                    user.root ? (
                                        <i className="fas fa-check text-success">
                                            {" "}
                                            Root
                                        </i>
                                    ) : (
                                        <i className="fas fa-check text-success"></i>
                                    )
                                ) : (
                                    <i className="fas fa-times text-danger"></i>
                                )}
                            </th>
                            <th>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Link
                                        href={
                                            auth.user.root &&
                                            auth.user.email !== user.email
                                                ? `/edit_user/${user._id}`
                                                : "#"
                                        }
                                    >
                                        <a>
                                            <i
                                                className="fas fa-edit text-info mr-2"
                                                title="Edit"
                                            ></i>
                                        </a>
                                    </Link>
                                    {auth.user.root &&
                                    auth.user.email !== user.email ? (
                                        <i
                                            className="fas fa-trash text-danger"
                                            title="Delete"
                                            aria-hidden="true"
                                            onClick={() =>
                                                dispatch({
                                                    type: ACTIONS.ADD_MODAL,
                                                    payload: {
                                                        data: users,
                                                        title: user.name,
                                                        id: user._id,
                                                        type: ACTIONS.ADD_USERS,
                                                        toDelete: "User",
                                                    },
                                                })
                                            }
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                            style={{
                                                marginLeft: "20px",
                                                marginTop: "4px",
                                                cursor: "pointer",
                                            }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="fas fa-trash text-danger"
                                            title="Delete"
                                            aria-hidden="true"
                                            style={{
                                                marginLeft: "20px",
                                                marginTop: "4px",
                                                cursor: "pointer",
                                            }}
                                        ></i>
                                    )}
                                </div>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default users
