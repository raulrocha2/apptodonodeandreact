const Task = require('../models/tasks');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError')


//GET all tasks route => /api/tasks
exports.getTasks = catchAsyncError (async (req, res, next) => {

    const tasks = await Task.find()

    res.status(200).json({
        success: true,
        count: tasks.length,
        tasks
    })
})


//GET single task route => /api/task/:id
exports.detailTask = catchAsyncError (async (req, res, next) => {


    const task = await Task.findById(req.params.id);

    if(!task) {
        return next(new ErrorHandler('Task not found', 404));
    }

    res.status(200).json({
        success: true,
        task
    })
})

//POST new task route => /api/task/new
exports.newTask = catchAsyncError (async (req, res, next) => {
    
    const task = await Task.create(req.body);

    res.status(201).json({
        success: true,
        task
    })
})


//PUT update task route => /api/task/update/:id
exports.updateTask = catchAsyncError (async (req, res, next) => {
    
    const task = await Task.findById(req.params.id);

    if (!task) {
        return next(new ErrorHandler('Task not found', 404));
    }

    await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: 'Task was updated'
    })
})

//DELETE  task route => /api/task/delete/:id
exports.deleteTask = catchAsyncError (async (req, res, next) => {
    
    const task = await Task.findById(req.params.id);

    if(!task) {
        return next(new ErrorHandler('Task not found', 404));
    }

    await Task.findOneAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Task was deleted'
    })
})

