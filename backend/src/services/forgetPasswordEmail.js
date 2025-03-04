import nodemailer from "nodemailer";

async function sendForgetPasswordEmail(
    email,
    forgetPasswordLink
) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,   
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset Password",
        text: `Hello,\n\nPlease click on the link below to reset your password:\n\n${forgetPasswordLink}`,
    };

    return transporter.sendMail(mailOptions);
}

export { sendForgetPasswordEmail };