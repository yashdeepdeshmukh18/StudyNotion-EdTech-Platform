// const nodemailer = require('nodemailer');

// const mailSender = async (email, title, body) => {
//     try{
//         let transporter = nodemailer.createTransport({
//             host: process.env.MAIL_HOST,
//             auth:{
//                 user: process.env.MAIL_USER,
//                 pass: process.env.MAIL_PASS,
//             }
//         })

//         let info = await transporter.sendMail({
//             from: 'StudyNotion || by yashdeep',
//             to:`${email}`,
//             subject: `${title}`,
//             html: `${body}`
//         })
//         console.log(info);
//         return info;
//     }
//     catch(err){
//         console.log(err.message);
//     }
// }


// module.exports = mailSender;

const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `"StudyNotion || by yashdeep" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        console.log("Mail sent successfully:", info);
        return info;

    } catch (err) {
        console.error("Mail sending failed:", err);
        throw err;
    }
};

module.exports = mailSender;