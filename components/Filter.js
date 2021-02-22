import React, { useState, useEffect, useContext } from "react"
import filterSearch from "../utils/filterSearch"
import { getData } from "../utils/fetchData"
import { useRouter } from "next/router"
import { DataContext } from "../store/GlobalState"

const Filter = () => {
    const [title, setTitle] = useState("")
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("")
    const [category, setCategory] = useState("")
    const router = useRouter()
    const { state, dispatch } = useContext(DataContext)
    const { categories } = state

    const handleSubmit = () => {}

    return (
        <div className="input-group flex-nowrap">
            <div className="input-group-prepend col-md-2 px-0 mt-2">
                <select
                    className="form-select text-capitalize"
                    value={category}
                >
                    {categories.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            <form
                className="col-md-8 mt-2 px-0"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div className="input-group">
                    <input
                        className="form-control"
                        type="text"
                        list="title_product"
                        value={search.toLowerCase()}
                    />

                    <button
                        type="submit"
                        className="btn btn-success position-absolute"
                        style={{ top: 0, right: 0, visibility: "hidden" }}
                    >
                        Search
                    </button>
                    <datalist id="title_product">
                        <option value="name">Title Name</option>
                    </datalist>
                </div>
            </form>

            <div className="input-group-prepend col-md-2 px-0 mt-2">
                <select className="form-select text-capitalize" value={sort}>
                    <option value="-createdAt">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="-sold">Best Seller</option>
                    <option value="-price">Price: Hight-Low</option>
                    <option value="price">Price: Low-Hight</option>
                </select>
            </div>
        </div>
    )
}

export default Filter
