import React, { useContext } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { DataContext } from "../store/GlobalState"
import Cookie from "js-cookie"
import { ACTIONS } from "../store/Actions"

const NavBar = () => {
    const router = useRouter()
    const { state, dispatch } = useContext(DataContext)
    const { auth, cart } = state

    const isActive = (r) => {
        if (r === router.pathname) {
            return "active"
        } else {
            return ""
        }
    }

    const handleLogout = () => {
        Cookie.remove("refreshtoken", { path: "api/auth/accessToken" })
        localStorage.removeItem("firstLogin")
        dispatch({ type: ACTIONS.AUTH, payload: {} })
        dispatch({ type: ACTIONS.NOTIFY, payload: { success: "Logged out" } })
        router.push("/")
    }

    const adminRoute = () => {
        return (
            <>
                <li>
                    <Link href="/users">
                        <a className="dropdown-item">Users</a>
                    </Link>
                </li>
                <li>
                    <Link href="/create">
                        <a className="dropdown-item">Products</a>
                    </Link>
                </li>
                <li>
                    <Link href="/categories">
                        <a className="dropdown-item">Categories</a>
                    </Link>
                </li>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <li className="nav-item dropdown">
                <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <img
                        src={auth.user.avatar}
                        alt={auth.user.avatar}
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            transform: "translateY(-3px)",
                            marginRight: "5px",
                        }}
                    />
                    {auth.user.name}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                        <Link href="/profile">
                            <a className="dropdown-item">Profile</a>
                        </Link>
                    </li>
                    {auth.user.role === "admin" && adminRoute()}
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <button
                            className="dropdown-item"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </li>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link href="/">
                    <a className="navbar-brand">Asgard Market</a>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/cart">
                                <a className={"nav-link " + isActive("/cart")}>
                                    <i
                                        className="fas fa-shopping-cart position-relative"
                                        aria-hidden="true"
                                        style={{ marginRight: "10px" }}
                                    >
                                        <span
                                            className="position-absolute"
                                            style={{
                                                padding: "3px 6px",
                                                background: "#ed143dc2",
                                                borderRadius: "50%",
                                                top: "-10px",
                                                right: "-10px",
                                                color: "white",
                                                fontSize: "14px",
                                            }}
                                        >
                                            {cart.length}
                                        </span>
                                    </i>
                                    Cart
                                </a>
                            </Link>
                        </li>
                        {Object.keys(auth).length === 0 ? (
                            <li className="nav-item">
                                <Link href="/login">
                                    <a
                                        className={
                                            "nav-link " + isActive("/login")
                                        }
                                    >
                                        <i
                                            className="fas fa-user"
                                            aria-hidden="true"
                                        ></i>{" "}
                                        Login
                                    </a>
                                </Link>
                            </li>
                        ) : (
                            loggedRouter()
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
