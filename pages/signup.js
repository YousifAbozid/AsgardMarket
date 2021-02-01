import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import valid from "../utils/valid"

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cfPassword, setCfPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        const errorMessage = valid(name, email, password, cfPassword)
        if (errorMessage) {
            console.log(errorMessage)
        }
    }

    return (
        <div>
            <Head>
                <title>Signup</title>
            </Head>
            <form
                className="mx-auto my-4"
                style={{ maxWidth: "500px" }}
                onSubmit={handleSubmit}
            >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleInputPassword2"
                        className="form-label"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword2"
                        value={cfPassword}
                        onChange={({ target }) => setCfPassword(target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-dark w-100">
                    Signup
                </button>
                <p className="my-2">
                    Already have an Account?{" "}
                    <Link href="/login">
                        <a style={{ color: "crimson" }}>Login</a>
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Signup