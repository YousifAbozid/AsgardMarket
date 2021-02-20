const filterSearch = ({ router, page, category, sort, search }) => {
    const path = router.pathname
    const query = router.query

    if (category) query.category = category
    if (page) query.page = page
    if (sort) query.sort = sort
    if (search) query.search = search

    router.push({
        pathname: path,
        query,
    })
}

export default filterSearch
