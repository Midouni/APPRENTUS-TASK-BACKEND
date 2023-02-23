require('dotenv').config()
require('express-async-errors')
const express = require('express')
var cors = require('cors')
const app = express()


const { getAllExpensesDashboard } = require('./controllers/expenses')
//router
const expensesRouter = require('./routes/expenses')
app.use(cors())
app.use(express.json());
app.use('/api/v1/expenses', expensesRouter)
app.get('/api/v1/dashboard', getAllExpensesDashboard)


//middleware 
const errorsHandlerMiddleware = require('./middleware/errors-handler')
const notFoundMiddleware = require('./middleware/not-found')
app.use(errorsHandlerMiddleware)
app.use(notFoundMiddleware)




//import function help for connect to database
const connectDB = require('./db/connect')

const PORT = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.URI_MONGO)
        app.listen(PORT, () => { console.log(`server running on port ${PORT}`) })
    } catch (error) {

    }
}
start()