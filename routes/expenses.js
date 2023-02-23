const express = require('express')
const Router = express.Router()

const { getAllExpenses, getExpense, createExpense, updateExpense, removeExpense } = require('../controllers/expenses')


Router.route('/')
    .get(getAllExpenses)
    .post(createExpense)
Router.route('/:id')
    .get(getExpense)
    .patch(updateExpense)
    .delete(removeExpense)


module.exports = Router