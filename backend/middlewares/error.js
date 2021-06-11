const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, resp, next) => {
    err.statusCode = err.statusCode || 500;
    
    if (process.env.NODE_ENV === 'DEVELOPMENT'){

        resp.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }
    if (process.env.NODE_ENV === 'PRODUCTION'){
        
        let error = {... err}

        error.message = err.message

        //Wrong Mongoose Object Id Erro
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }
        
        //Handling Mogoose duplicate key errors
        if (err.code === 11000){
            const message = `Duplicate ${err.message} enter`
            error = new ErrorHandler(message, 400)
        }
        

        // Handling wrong JWT error
        if (err.name === 'JsonWebTokenError') {
            const message = 'Json WebToken is invalid '
            error = new ErrorHandler(message, 400)
        }

        // Handling Expired JWT error
        if (err.name === 'TokenExpiredError') {
            const message = 'Json WebToken is expired '
            error = new ErrorHandler(message, 400)
        }
        
        //Wrong Mongoose validation Error
        if (err.name === 'ValidatorError') {
            const message =  Object.values(err.errors).map(value  => value.message)
            error = new ErrorHandler(message, 400)
        }

        resp.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal server error!'
        })
        
    }
    
}