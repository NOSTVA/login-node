const express = require('express')
const app = express()
app.use(express.json())

const connectDB = require('./db/db')
const {register, login} = require('./controllers/auth')
const {addTask, getTask, getTaskById} = require('./controllers/tasks')


app.post('/register', register)
app.post('/login', login)


app.post('/addTask', addTask)
app.get('/getTask', getTask)
app.get('/getTask/:id', getTaskById)



const start = async () => {
    await connectDB()
    app.listen(3000, ()=> console.log('server is listening...'))
}

start()