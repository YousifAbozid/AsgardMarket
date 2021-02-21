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

    return (
        <div className="input-group">
            <div className="input-group-prepend col-md-2 px-0 mt-2">
                <select
                    className="form-select text-capitalize"
                    value={category}
                    //onChange={({ target }) => setCategory(target.value)}
                >
                    {categories.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default Filter
