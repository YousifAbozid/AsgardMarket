import Head from "next/head"
import Link from "next/link"
import { useState, useContext } from "react"
import valid from "../utils/valid"
import { postData } from "../utils/fetchData"
import { DataContext } from "../store/GlobalState"
import ACTIONS from "../store/Actions"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { state, dispatch } = useContext(DataContext)

    const handleSubmit = async (event) => {
        event.preventDefault()

        dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })

        const userData = { email, password }
        const response = await postData("auth/login", userData)
        if (response.error) {
            return dispatch({
                type: ACTIONS.NOTIFY,
                payload: { error: response.error },
            })
        }

        return dispatch({
            type: ACTIONS.NOTIFY,
            payload: { success: response.message },
        })
    }

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <form
                className="mx-auto my-4"
                style={{ maxWidth: "500px" }}
                onSubmit={handleSubmit}
            >
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
                        onChange={({ target }) => {
                            setEmail(target.value)
                            dispatch({ type: ACTIONS.NOTIFY, payload: {} })
                        }}
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
                        onChange={({ target }) => {
                            setPassword(target.value)
                            dispatch({ type: ACTIONS.NOTIFY, payload: {} })
                        }}
                    />
                </div>

                <button type="submit" className="btn btn-dark w-100">
                    Login
                </button>
                <p className="my-2">
                    Don't have an Account?{" "}
                    <Link href="/signup">
                        <a style={{ color: "crimson" }}>SignUp</a>
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login
