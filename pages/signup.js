import { useState, useContext, useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import valid from "../utils/valid"
import { postData } from "../utils/fetchData"
import { DataContext } from "../store/GlobalState"
import { ACTIONS } from "../store/Actions"

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cfPassword, setCfPassword] = useState("")
    const router = useRouter()
    const { state, dispatch } = useContext(DataContext)
    const { auth } = state

    useEffect(() => {
        if (Object.keys(auth).length !== 0) {
            router.push("/")
        }
    }, [auth])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const errorMessage = valid(name, email, password, cfPassword)

        if (errorMessage) {
            return dispatch({
                type: ACTIONS.NOTIFY,
                payload: { error: errorMessage },
            })
        }

        dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })

        const userData = { name, email, password, cfPassword }
        const response = await postData("auth/signup", userData)
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
                <title>Asgard Market - Signup</title>
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
                        onChange={({ target }) => {
                            setName(target.value)
                            dispatch({ type: ACTIONS.NOTIFY, payload: {} })
                        }}
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
                        onChange={({ target }) => {
                            setCfPassword(target.value)
                            dispatch({ type: ACTIONS.NOTIFY, payload: {} })
                        }}
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
