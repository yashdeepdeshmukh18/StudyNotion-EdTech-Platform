const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const berypt = require('bcrypt');


// resestPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try{
        // get email from req body
        const email = req.body.email;
        // check user present with email, email validation
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found with this email'
            });
        }

        // generate token
        const token =  crypto.randomUUID();

        // update user by adding token and expiry time
        const updatedDetails = await User.findByIdAndUpdate(
                                    {email: email},
                                    {
                                        token: token,
                                        resetPasswordExpires: Date.now() + 5*60*1000 // 5 minutes
                                    },
                                    {new: true}
        );

        // create url
        const url = `http://localhost:3000/update-password/${token}`

        // send mail contianing url
        await mailSender(email, 
                        "Password Reset Link",
                        `Password reset Link: ${url}`
        );

        // return response
        return res.json({
            success:true,
            message: 'Email sent successfully, please check email and change your pwd'
        });
    }
    catch(error){
        console.log(error);
        return res.status().json({
            success: false,
            message:'something went wrong while sending reset password email'
        });
    }
}

// resetPassword

exports.resetPassword = async (req, res) => {
    try{
        // data fetch
        const {password, confirmPassword, token} = req.body;
        // validation
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: 'Password and confirm password do not match'
            });
        }

        // get user details from db using token
        const userDetails = await User.findOne({token: token});
        
        // if no entry - invalid token
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: 'Invalid token'
            });
        }

        // check token expiry
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success: false,
                message: 'Token has expired, please try again'
            });
        }   

        // hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // update pwd in db
        await User.findByIdAndUpdate(
            {token: token},
            {password: hashedPassword},
            {new: true}
        );

        // return response
        return res.json({
            success: true,
            message: 'Password updated successfully'
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while resetting password'
        }); 
    }
}

