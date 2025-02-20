import nodemailer from "nodemailer";

async function sendEmail(
    username,
    email,
    code
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
        subject: "Verification Code",
        text: `Hello ${username},\n\nYour verification code is: ${code}\n\nPlease use this code to complete your signup process.`,
    };

    return transporter.sendMail(mailOptions);
}

export { sendEmail };
