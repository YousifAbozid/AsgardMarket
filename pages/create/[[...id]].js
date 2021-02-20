import Head from "next/head"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { ACTIONS } from "../../store/Actions"
import { DataContext } from "../../store/GlobalState"
import { getData, postData, putData } from "../../utils/fetchData"
import { imageUpload } from "../../utils/imageUpload"

const ProductsManager = () => {
    const { state, dispatch } = useContext(DataContext)
    const { auth, categories } = state
    const router = useRouter()
    const { id } = router.query
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [inStock, setInStock] = useState(0)
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState([])
    const [onEdit, setOnEdit] = useState(false)

    const handleUploadInput = async ({ target }) => {
        dispatch({ type: ACTIONS.NOTIFY, payload: {} })

        let newImages = []
        let num = 0
        let error = ""

        const files = [...target.files]
        if (!files) {
            return dispatch({
                type: ACTIONS.NOTIFY,
                payload: { error: "File does not exist." },
            })
        }

        files.forEach((file) => {
            if (file.type !== "image/jpeg" && file.type !== "image/png") {
                return (error = "Image format is incorrect.")
            }
            // 1024 * 1024 * 2 = 2mb
            if (file.size > 1024 * 1024 * 2) {
                return (error = "Select an image not bigger than 2MB.")
            }

            num += 1
            if (num <= 5) newImages.push(file)
            return newImages
        })

        if (error) dispatch({ type: ACTIONS.NOTIFY, payload: { error } })

        const imgCount = images.length
        if (imgCount + newImages.length > 5) {
            return dispatch({
                type: ACTIONS.NOTIFY,
                payload: { error: "You can select up to 5 images only." },
            })
        }
        setImages([...images, ...newImages])
    }

    const handleDelete = (i) => {
        setImages(images.filter((image, index) => index !== i)) // this work
        // setImages(images.filter((image, index) => (index === i ? null : image))) // also this works
        // third option won't bite either
        // const newArray = [...images]
        // newArray.splice(i, 1)
        // setImages(newArray)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (auth.user.role !== "admin") {
            return dispatch({
                type: ACTIONS.NOTIFY,
                payload: { error: "Unauthorized, you are not an admin." },
            })
        }

        if (
            !title ||
            !price ||
            !inStock ||
            !description ||
            !content ||
            !category ||
            images.length === 0
        ) {
            return dispatch({
                type: ACTIONS.NOTIFY,
                payload: { error: "Please add all fields." },
            })
        }
        dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })

        let media = []
        const imgNewUrl = images.filter((image) => !image.url)
        const imgOldUrl = images.filter((image) => image.url)
        if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl)

        if (onEdit) {
            await putData(
                `product/${id}`,
                {
                    title,
                    price,
                    inStock,
                    description,
                    content,
                    category,
                    images: [...imgOldUrl, ...media],
                },
                auth.token
            ).then((response) => {
                if (response.error) {
                    return dispatch({
                        type: ACTIONS.NOTIFY,
                        payload: { error: response.error },
                    })
                }
                dispatch({
                    type: ACTIONS.NOTIFY,
                    payload: { success: response.message },
                })
                return router.push(`/product/${id}`)
            })
        } else {
            await postData(
                "product",
                {
                    title,
                    price,
                    inStock,
                    description,
                    content,
                    category,
                    images: [...imgOldUrl, ...media],
                },
                auth.token
            ).then((response) => {
                if (response.error) {
                    return dispatch({
                        type: ACTIONS.NOTIFY,
                        payload: { error: response.error },
                    })
                }

                dispatch({
                    type: ACTIONS.NOTIFY,
                    payload: { success: response.message },
                })

                // this timer will redirect to the home page after 2 seconds to give a chance to
                // the admin to see the success message
                setTimeout(() => {
                    router.push("/")
                }, 1000 * 2)
            })
        }
    }

    useEffect(() => {
        if (id) {
            setOnEdit(true)
            getData(`product/${id}`, auth.token).then((response) => {
                let product = response.product
                setTitle(product.title)
                setPrice(product.price)
                setInStock(product.inStock)
                setDescription(product.description)
                setContent(product.content)
                setCategory(product.category)
                setImages(product.images)
            })
        } else {
            setOnEdit(false)
            setTitle("")
            setPrice(0)
            setInStock(0)
            setDescription("")
            setContent("")
            setCategory("")
            setImages([])
        }
    }, [id])

    if (!auth.user) return null

    return (
        <div className="products_manager">
            <Head>
                <title>Asgard Market - Products Manager</title>
            </Head>

            <form className="row" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control d-block my-3 w-100 p-2"
                        placeholder="Title"
                        value={title}
                        onChange={({ target }) => {
                            setTitle(target.value)
                            dispatch({ type: ACTIONS.NOTIFY, payload: {} })
                        }}
                    />

                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="price" className="form-label">
                                Price
                            </label>
                            <input
                                type="number"
                                className="form-control d-block w-100"
                                placeholder="Price"
                                value={price}
                                onChange={({ target }) => {
                                    setPrice(target.value)
                                    dispatch({
                                        type: ACTIONS.NOTIFY,
                                        payload: {},
                                    })
                                }}
                            />
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="inStock" className="form-label">
                                In Stock
                            </label>
                            <input
                                type="number"
                                className="form-control d-block w-100"
                                placeholder="In Stock"
                                value={inStock}
                                onChange={({ target }) => {
                                    setInStock(target.value)
                                    dispatch({
                                        type: ACTIONS.NOTIFY,
                                        payload: {},
                                    })
                                }}
                            />
                        </div>
                    </div>

                    <textarea
                        className="form-control d-block my-3 w-100 p-2"
                        rows="3"
                        cols="30"
                        placeholder="Description"
                        value={description}
                        onChange={({ target }) => {
                            setDescription(target.value)
                            dispatch({
                                type: ACTIONS.NOTIFY,
                                payload: {},
                            })
                        }}
                    />
                    <textarea
                        className="form-control d-block my-3 w-100 p-2"
                        rows="5"
                        cols="30"
                        placeholder="Content"
                        value={content}
                        onChange={({ target }) => {
                            setContent(target.value)
                            dispatch({
                                type: ACTIONS.NOTIFY,
                                payload: {},
                            })
                        }}
                    />
                    <div className="input-group-prepend px-0 my-2">
                        <select
                            className="form-select text-capitalize"
                            aria-label="Default select example"
                            value={category}
                            onChange={({ target }) => {
                                setCategory(target.value)
                                dispatch({
                                    type: ACTIONS.NOTIFY,
                                    payload: {},
                                })
                            }}
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="col-md-6 my-3">
                    <div className="input-group mb-3">
                        <div>
                            <input
                                className="form-control"
                                type="file"
                                onChange={handleUploadInput}
                                multiple
                                accept="image/*"
                            />
                        </div>
                    </div>

                    <div className="row img-up mx-0">
                        {images.map((image, index) => (
                            <div key={index} className="file_img">
                                <img
                                    src={
                                        image.url
                                            ? image.url
                                            : URL.createObjectURL(image)
                                    }
                                    className="img-thumbnail rounded"
                                    alt=""
                                />
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={() => handleDelete(index)}
                                ></button>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn btn-info my-3 px-4">
                    {onEdit ? "Update" : "Create"}
                </button>
            </form>
        </div>
    )
}

export default ProductsManager
