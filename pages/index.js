import { getData } from "../utils/fetchData"
import { useState } from "react"
import Head from "next/head"
import ProductItem from "../components/product/ProductItem"

const Home = (props) => {
    const [products, setProducts] = useState(props.products)

    return (
        <div className="products">
            <Head>
                <title>Asgard Market</title>
            </Head>

            {products.length === 0 ? (
                <h2>No products yet, please check later.</h2>
            ) : (
                products.map((product) => (
                    <ProductItem key={product._id} product={product} />
                ))
            )}
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
