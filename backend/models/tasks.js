const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title :{
        type: String,
        required: [true, 'Please enter your task'],
        trim: true,
        maxLength: [100, 'Title task cannot exceed 100 characteres']
    },
    completed : {
        type: Boolean,
        default:"false"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Task', taskSchema); 