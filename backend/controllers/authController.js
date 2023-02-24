const user = require("../models/userModel")
const bcrypt = require("bcrypt");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const { getJwtToken } = require("../middleware/jwtToken");


exports.register = catchAsyncError(async (req, res) => {
    const { name, email, password, avatar } = req.body;
    const findUser = await user.findOne({email: email});
    if(findUser){
        return next(new ErrorHandler("User already exist", 400))
    }else{
        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10);
        let newUser = await user.create({
            name,
            email,
            password: hashedPassword,
            avatar,
        });
        let id =  await (await newUser.save())._id
        const token = getJwtToken({id:id})
        res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true })
            .json({
                success: true,
                user: newUser,
                token
            })
    }
});

exports.login = catchAsyncError(async (req, res, next) => {
    const { email, password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password'), 403)
    }

    const findUser = await user.findOne({email})
    if(!findUser){
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    let validPassword = await bcrypt.compare(password,findUser.password);
    if(!validPassword){
        return next(new ErrorHandler("Invalid email or password", 401))
    }else{
        let id =  await findUser._id
        const token = getJwtToken(id)
        user.token = token
        res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true })
        .json({
                success: true,
                token
            })
    }
});