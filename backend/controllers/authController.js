const User = require('../models/user')
const sendToken = require('../utils/jwtToken');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');




//Register User => /api/user/register
exports.registerUser = catchAsyncError(async ( req, resp, next) => {
    
    const { name, email, password } = req.body;

    const user = await User.create({
        name, 
        email,
        password
    })

    sendToken(user, 200, resp )
   

})

// Login User => /api/user/login
exports.loginUser = catchAsyncError( async (req, resp, next) => {
     
    const { email, password } = req.body;
    console.log(email, password)

    //Check email ad password 
    if(!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }
    // Finding user in database
    const user = await User.findOne({ email }).select('+password')
    
    if(!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    //Check if password is correct 
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched){
        return next(new ErrorHandler('Invalid  Password', 401));
    }

    sendToken(user, 200, resp )
})