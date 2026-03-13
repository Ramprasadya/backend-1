import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
        { new: true },
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
        { new: true },
      );
    }

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ramaurcode@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD, 
  },
});

    const mainoptions = {
      from: "ramaurcode@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset Your password ",
      html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}" > here </a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password "} or copy and pase url in your browser url is below  <br/> ${process.env.domain}/verifyemail?token=${hashedToken} </p>`,
    };

    const mailresponse = await transporter.sendMail(mainoptions) 
    return mailresponse

  } catch (error) {
    console.log(error);
  }
};
