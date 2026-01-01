const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth
exports.auth = async (req, res, next) => {
    try{
        // Extracting JWT from request cookies, body or header
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

        // If JWT is missing, return response
		if (!token) {
			return res.status(401).json({
                success: false, 
                message: `Token Missing`
            });
		}

        // verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded JWT:", decode);
            req.user = decode;  
        }
        catch(err){
            // verification failed
            return res.status(401).json({
                success: false,
                message: `Token is invalid`
            });

        }        
        next();

    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: `Something went wrong while verifying the token`
        });
    }
}

// isStudent
exports.isStudent = async(req, res, next) => {
    try{
        if(req.user.accountType !== 'Student'){
            return res.status(401).json({
                success: false,
                message: `This is a protected route for student only`
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: `User role can not be be  verified, please try again`
        });
    }
}

// isInstructor
exports.isStudent = async(req, res, next) => {
    try{
        if(req.user.accountType !== 'Instructor'){
            return res.status(401).json({
                success: false,
                message: `This is a protected route for instructors only`
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: `User role can not be be  verified, please try again`
        });
    }
}

// isAdmin
exports.isStudent = async(req, res, next) => {
    try{
        if(req.user.accountType !== 'Admin'){
            return res.status(401).json({
                success: false,
                message: `This is a protected route for Admin only`
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: `User role can not be be  verified, please try again`
        });
    }
}