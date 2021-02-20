import Head from "next/head"
import { useContext, useState } from "react"
import ProductItem from "../components/product/ProductItem"
import { ACTIONS } from "../store/Actions"
import { DataContext } from "../store/GlobalState"
import { getData } from "../utils/fetchData"

const Home = (props) => {
    const [products] = useState(props.products)
    const { state, dispatch } = useContext(DataContext)
    const { auth } = state

    return (
        <div>
            <Head>
                <title>Asgard Market - Store for what you desire!</title>
            </Head>

            {auth.user && auth.user.root && products.length !== 0 && (
                <div
                    style={{
                        marginTop: "12px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <button
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() =>
                            dispatch({
                                type: ACTIONS.ADD_MODAL,
                                payload: {
                                    data: "",
                                    title: "Protocol Zero => Clean Asgard",
                                    id: "",
                                    type: ACTIONS.DELETE_ALL_PRODUCTS,
                                    toDelete: "All the Products",
                                },
                            })
                        }
                    >
                        Activate Protocol Zero
                    </button>
                </div>
            )}

            <div className="products">
                {products.length === 0 ? (
                    <h2>No products yet, please check later.</h2>
                ) : (
                    products.map((product) => (
                        <ProductItem key={product._id} product={product} />
                    ))
                )}
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    // this is server side rendering so it will print in the console here only not in the browser
    const response = await getData("product")
    return {
        props: {
            products: response.products,
            result: response.result,
        },
    }
}

export default Home
