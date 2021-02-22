import connectDB from "../../../utils/connectDB"
import Product from "../../../models/product"
import auth from "../../../middleware/auth"

connectDB()

export default async (request, response) => {
    switch (request.method) {
        case "GET":
            await getProducts(request, response)
            break
        case "POST":
            await createProduct(request, response)
            break
        case "DELETE":
            await deleteProducts(request, response)
            break
    }
}

class APIfeatures {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }

    filtering() {
        const queryObj = { ...this.queryString }

        const excludeFields = ["page", "sort", "limit"]
        excludeFields.forEach((el) => delete queryObj[el])

        if (queryObj.category !== "all")
            this.query.find({ category: queryObj.category })
        if (queryObj.title !== "all")
            this.query.find({ title: { $regex: queryObj.title } })

        this.query.find()
        return this
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join("")
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort("-createdAt")
        }

        return this
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 6
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this
    }
}

const getProducts = async (request, response) => {
    try {
        const features = new APIfeatures(Product.find(), request.query)
            .filtering()
            .sorting()
            .paginating()

        const products = await features.query
        return response.json({
            status: "Success",
            result: products.length,
            products,
        })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}

const createProduct = async (request, response) => {
    try {
        const result = await auth(request, response)
        if (result.role !== "admin") {
            return response
                .status(401)
                .json({ error: "Unauthorized, you are not an admin." })
        }

        const {
            title,
            price,
            inStock,
            description,
            content,
            category,
            images,
        } = request.body
        if (
            !title ||
            !price ||
            !inStock ||
            !description ||
            !content ||
            !category ||
            images.length === 0
        ) {
            return response
                .status(400)
                .json({ error: "Please add all fields." })
        }

        const newProduct = new Product({
            title: title.toLowerCase(),
            price,
            inStock,
            description,
            content,
            category,
            images,
        })

        await newProduct.save()

        return response
            .status(201)
            .json({ message: "Created product successfully." })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}

const deleteProducts = async (request, response) => {
    try {
        const result = await auth(request, response)
        if (!result.root) {
            return response
                .status(401)
                .json({ error: "Unauthorized, you are not the manager." })
        }

        await Product.deleteMany()

        return response.json({
            message: "Activated Protocol Zero Successfully.",
        })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}
