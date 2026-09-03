const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");

// sendOTP
exports.sendOTP = async (req, res) => {

   try{

    // fetch email from req body
    const {email} = req.body;

    // check if user already exists
    const checkUserPresent = await User.findOne({email});

    if(checkUserPresent){
        return res.status(400).json({
            success: false,
            message: 'User already exists'
        });
    }

    // generate OTP
    var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    });
    console.log("OTP generatoed: ", otp);

    // check unique otp or not
    let result = await OTP.findOne({otp: otp});

    while(result){
        otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        result = await OTP.findOne({otp: otp});
    }

        const otpPayLoad = {email, otp};

        // create OTP entry in DB
        const otpBody = await OTP.create(otpPayLoad);
        console.log(otpBody);

        // return response successfully
        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp,
        })
    
   }
   catch(error){
        console.log(error);

        return res.status(500).json({
            success: false,
            message : error.message
        })
   }


}


// signup
exports.signUp = async (req, res) => {
    try{
        // data fetch from req body
        const {firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp} = req.body;

        // validate otp
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        // 2 password match
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and confirmpassword do not match"
            })
        }

        // check user already exists or not 
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message: "User alredy exists"
            })
        }

        // find the most recent otp stored for the user
        const recentOTP = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        console.log("Recent OTP:", recentOTP);

        // validate otp
        if(recentOTP.length === 0){
            // otp not found
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            })
        }
        else if(otp !== recentOTP[0].otp){
            // Invalid otp
            return res.status(400).json({
                success: false,
                message: " Invalid OTP"
            });
        }

        //  Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user entry in DB

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })

        const user = await User.create({
            firstName, lastName, email, contactNumber, password:hashedPassword, accountType,
            additionalDetails:profileDetails._id, image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}-${lastName}`,
        })

        // return res 
        return res.status(200).json({
            success:true,
            message: "User registered successfully",
            user,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again later"
        })
    }

}

// login
exports.login = async (req, res) => {
    try{
        // get data from req body
        const {email, password} = req.body;

        // validation data
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // user check exist or not
        const user = await User.findOne({email}).populate('additionalDetails');
        if(!user){
            return res.status(404).json({
                success:false,
                message: "User is not registered, plz signup first"
            })
        }
        // generat JWT, afer password match
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
            // Save token to user document in database
            user.token = token;
            user.password = undefined;
            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            });
        }
        else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}

    }
    catch(error){
       console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
    }
};


// changePassword

exports.changePassword = async (req, res) => {
    try{
        // get data from req body
        const userDetails = await User.findById(req.user.id);

        // get old password, new password, confirm new password
        const {oldPassword, newPassword, confirmNewPassword} = req.body;

        // validation
        // validate old password match
        const isPassword = await bcrypt.compare(oldPassword, userDetails.password);

        if(!isPassword){
            return res.status(401).json({ 
                success: false,
                message: "The password is incorrect" 
            });
        }

        // Match new password and confirm new password
        if (newPassword !== confirmNewPassword) {
            // If new password and confirm new password do not match, return a 400 (Bad Request) error
            return res.status(400).json({
                success: false,
                message: "The password and confirm password does not match",
            });
        }

        // update password in DB
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        );
        
        // send mail -> password updated
        try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} 
        catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}


        // return response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully" 
        });


    }
    catch(error){
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }
}

