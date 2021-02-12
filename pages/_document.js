import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta
                        name="description"
                        content="Asgard Market is a Shopping app build with next.js"
                    />
                    <link
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
                        rel="stylesheet"
                    />
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"></script>
                    <script
                        src="https://kit.fontawesome.com/2ac16e2682.js"
                        crossOrigin="anonymous"
                    ></script>
                    <script
                        src={`https://www.paypal.com/sdk/js?client-id=${process.env.SB_CLIENT_ID}`}
                    ></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
