import Head from "next/head"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import Filter from "../components/Filter"
import ProductItem from "../components/product/ProductItem"
import { ACTIONS } from "../store/Actions"
import { DataContext } from "../store/GlobalState"
import { getData } from "../utils/fetchData"
import filterSearch from "../utils/filterSearch"

const Home = (props) => {
    const [products, setProducts] = useState(props.products)
    const { state, dispatch } = useContext(DataContext)
    const { auth } = state
    const [page, setPage] = useState(1)
    const router = useRouter()

    useEffect(() => {
        setProducts(props.products)
    }, [props.products])

    useEffect(() => {
        if (Object.keys(router.query).length === 0) {
            setPage(1)
        } else {
            setPage(Number(router.query.page))
        }
    }, [router.query])

    const handleLoadMore = () => {
        // TODO if there is no page=1 in router path add it first so load more work with categories
        setPage(page + 1)
        filterSearch({ router, page: page + 1 })
        // this timer to scroll page down to see more products because it goes up when it fetches new data,
        // because for a moment there is no products so the screen return to the normal size,
        // maybe I need to change this behavior soon for better performance, but for now it works just fine.
        setTimeout(() => {
            window.scrollBy(0, 10000)
        }, 300) // I guess 300 ms is enough to get the products as this is server side rendering
        // if not enough and scrolling seems not right you can increase the time like to 400 or 500 or whatever.
    }

    return (
        <div>
            <Head>
                <title>Asgard Market - Store for what you desire!</title>
            </Head>

            <Filter />

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

            {props.result < page * 6 ? (
                ""
            ) : (
                <button
                    className="btn btn-outline-info d-block mx-auto mb-4"
                    onClick={handleLoadMore}
                >
                    Load More
                </button>
            )}
        </div>
    )
}

export async function getServerSideProps({ query }) {
    // this is server side rendering so it will print in the console here only not in the browser
    const page = query.page || 1
    const category = query.category || "all"
    const sort = query.sort || ""
    const search = query.search || "all"

    const response = await getData(
        `product?limit=${
            page * 6
        }&category=${category}&sort=${sort}&title=${search}`
    )
    return {
        props: {
            products: response.products,
            result: response.result,
        },
    }
}

export default Home
