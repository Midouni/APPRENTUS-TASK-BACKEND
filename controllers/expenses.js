const { StatusCodes } = require('http-status-codes')
const Expense = require('../models/ExpenseSchema')
const NotFoundError = require('../errors/not-found-error')
const { filterExpenses } = require('../utils/expense')
const { dateFormat } = require('../utils/dateFormat')

const getAllExpenses = async (req, res) => {
    const { queryOrder, queryObject } = filterExpenses(req.query)
    let expenses = await Expense.find({ ...queryObject })
        .select(queryOrder.select)
        .limit(queryOrder.limit)
        .skip(queryOrder.skip)
        .sort(queryOrder.sort)

    expenses = expenses.map((item) => {
        item = { ...item._doc, date: dateFormat(item.date) }
        return item
    })
    res.status(StatusCodes.OK).send(expenses)
}


const getExpense = async (req, res) => {
    const id = req.params['id']
    let expense = await Expense.findOne({ _id: id })
    expense = { ...expense._doc, date: dateFormat(expense.date) }
    res.status(StatusCodes.OK).json(expense)
}



const createExpense = async (req, res) => {
    const { sort } = req.query
    await Expense.create({ ...req.body })
    let expenses = await Expense.find().sort(sort)
    expenses = expenses.map((item) => {
        item = { ...item._doc, date: dateFormat(item.date) }
        return item
    })
    res.status(StatusCodes.CREATED).send(expenses)
}

const updateExpense = async (req, res) => {
    const id = req.params['id'];
    const { sort } = req.query
    const expense = await Expense.findByIdAndUpdate({ _id: id }, { ...req.body }, { runValidators: true, returnDocument: 'after' })
    if (!expense) {
        throw new NotFoundError(`expense with id ${id} does not exist`)
    }
    let expenses = await Expense.find().sort(sort)
    expenses = expenses.map((item) => {
        item = { ...item._doc, date: dateFormat(item.date) }
        return item
    })
    res.status(StatusCodes.OK).send(expenses)
}


const removeExpense = async (req, res) => {
    const id = req.params['id'];
    const { sort } = req.query
    const expense = await Expense.findByIdAndDelete(id)
    if (!expense) {
        throw new NotFoundError(`expense with id ${id} does not exist`)
    }

    let expenses = await Expense.find().sort(sort)
    expenses = expenses.map((item) => {
        item = { ...item._doc, date: dateFormat(item.date) }
        return item
    })
    res.status(StatusCodes.OK).send(expenses)
}

const getAllExpensesDashboard = async (req, res) => {
    const { queryOrder, queryObject } = filterExpenses(req.query)
    let expenses = await Expense.find({ ...queryObject })
        .select(queryOrder.select)
        .limit(queryOrder.limit)
        .skip(queryOrder.skip)
        .sort(queryOrder.sort)

    expenses = expenses.map((item) => {
        item = { ...item._doc, date: dateFormat(item.date) }
        return item
    })
    let allExpAmount = 0
    let allExp = 0

    let approvedExpAmount = 0
    let approvedExp = 0

    let underReviewExpAmount = 0
    let underReviewExp = 0

    let rejectedExpAmount = 0
    let rejectedExp = 0

    expenses.forEach((item) => {
        if (item.status === 1) {
            approvedExpAmount += item.amount
            approvedExp += 1
        } else if (item.status === 0) {
            underReviewExpAmount += item.amount
            underReviewExp += 1
        } else if (item.status === -1) {
            rejectedExpAmount += item.amount
            rejectedExp += 1
        }
        allExpAmount += item.amount
        allExp += 1
    })

    res.status(StatusCodes.OK).json({
        allExpAmount,
        allExp,
        approvedExpAmount,
        approvedExp,
        underReviewExpAmount,
        underReviewExp,
        rejectedExpAmount,
        rejectedExp,
        'data': expenses
    })
}

module.exports = {
    getAllExpenses,
    getExpense,
    createExpense,
    updateExpense,
    removeExpense,
    getAllExpensesDashboard
}