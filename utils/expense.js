//this middleware for filter "get all user"
const filterExpenses = (query) => {
    const {
        name,
        date,
        desc,
        amount,
        startDate,
        endDate,
        status,
        createdAt,//not complete yet
        updatedAt,//not complete yet

        select,
        sort,
        limit,
        skip
    } = query

    queryObject = {}
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    if (date) {
        queryObject.date = date
    }
    if (desc) {
        queryObject.desc = { $regex: desc, $options: 'i' }
    }
    if (amount) {
        queryObject.amount = amount
    }
    if (startDate) {
        queryObject.date = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    }
    if (status) {
        queryObject.status = status
    }

    queryOrder = {}
    if (select) {
        queryOrder.select = select.split(',').join(' ')
    }
    if (sort) {
        queryOrder.sort = sort.split(',').join(' ')
    }
    if (limit) {
        queryOrder.limit = Number(limit)
    }
    if (skip) {
        queryOrder.skip = Number(skip)
    }
    return { queryOrder, queryObject }

}

module.exports = {
    filterExpenses,
}