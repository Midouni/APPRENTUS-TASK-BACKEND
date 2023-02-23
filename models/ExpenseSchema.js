const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide name of employer']
    },
    date: {
        type: Date,
        required: [true, 'please provide date of expense']
    },
    desc: {
        type: String,
        required: [true, 'please provide description of expense']
    },
    amount: {
        type: Number,
        required: [true, 'please provide amount']
    },
    status: {
        type: Number,
        enum: [-1, 0, 1],
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model("Expenses", ExpenseSchema)