const express = require('express')
const router = express.Router();

const { isAuthenticatedUser } = require('../middlewares/auth');
const { 
    getTasks, 
    detailTask, 
    newTask,
    updateTask,
    deleteTask
} = require('../controllers/tasksController')


router.route('/tasks').get(getTasks);
router.route('/task/:id').get(detailTask);
router.route('/task/new').post(newTask);
router.route('/task/update/:id').put(updateTask);
router.route('/task/delete/:id').delete(deleteTask);

module.exports = router;
