const path = require('path');
const express = require('express');
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

const sequelize = require('./util/database')
const errorController = require('./controllers/error')
const expenseRoutes = require('./routes/expenses')

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname,'views','expense.html'))
})
app.get('/signup', (req,res) => {
    res.sendFile(path.resolve(__dirname,'views','signup.html'))
})
app.use('/expenses', expenseRoutes)
app.use(errorController.get404);


sequelize.sync().then(result => {
    // console.log(result)
    app.listen(3000)
}).catch(err => console.log(err))

