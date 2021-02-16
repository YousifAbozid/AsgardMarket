import Head from "next/head"
import Link from "next/link"
import { useContext } from "react"
import { DataContext } from "../store/GlobalState"

const users = () => {
    const { state, dispatch } = useContext(DataContext)
    const { users, auth } = state

    return (
        <div className="table-responsive">
            <Head>
                <title>Asgard Market - Users</title>
            </Head>

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
                                            (auth.user.root &&
                                                auth.user.email) ||
                                            user.email
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
                                    {(auth.user.root && auth.user.email) ||
                                    user.email ? (
                                        <i
                                            className="fas fa-trash text-danger"
                                            title="Delete"
                                            aria-hidden="true"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
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
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
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
