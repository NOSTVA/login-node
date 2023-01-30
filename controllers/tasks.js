const Task = require('../models/Task')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const addTask = async (req, res) => {

    token = req.headers.authorization.split(" ")[1]
    const payload =  jwt.verify(token, "thisismyfingerprint")
    const {name} = req.body

    const task = await Task.create({name, createdBy: payload.id})
    res.json({task})

}
const getTask = async (req, res) => {

    token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, "thisismyfingerprint")

    const tasks = await Task.find({createdBy: payload.id})

    res.json({tasks})


}


const getTaskById = async (req, res) => {

    const taskId = req.params.id
    
    token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const task = await Task.findOne({_id: taskId, createdBy: payload.id})
    res.json({task})
}



module.exports = {addTask, getTask, getTaskById}