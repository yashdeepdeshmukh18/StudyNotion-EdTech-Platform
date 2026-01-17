const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailVerificationTemplate = require("../mail/templates/emailVerificationTemplate")

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now(),
        expires:5*60
    }

});


// function -> to send emails
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification Emails from StudyNotion", emailVerificationTemplate(otp));
        console.log("Mail sent successfully:", mailResponse);
    }
    catch(error){
        console.log("Error sending email:", error);
        throw error;
    }
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
    
    // Only send an email when a new document is created
    if (!this.isNew) {
        return next();
    }
    
    console.log("New document saved to database");
    await sendVerificationEmail(this.email, this.otp);
    
});

module.exports = mongoose.model("OTP", OTPSchema);