import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

const NavBar = () => {
    const router = useRouter()

    const isActive = (r) => {
        if (r === router.pathname) {
            return "active"
        } else {
            return ""
        }
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <Link href="/">
                    <a className="navbar-brand">Asgard Market</a>
                </Link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse justify-content-end"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav">
                        <li className="nav-item">
                            <Link href="/cart">
                                <a className={"nav-link " + isActive("/cart")}>
                                    <i
                                        className="fas fa-shopping-cart"
                                        aria-hidden="true"
                                    ></i>{" "}
                                    Cart
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/login">
                                <a className={"nav-link " + isActive("/login")}>
                                    <i
                                        className="fas fa-user"
                                        aria-hidden="true"
                                    ></i>{" "}
                                    Login
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
