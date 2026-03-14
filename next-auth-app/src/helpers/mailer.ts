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
        user: process.env.EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    const url = `${process.env.domain}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}`;

    const mainoptions = {
      from: process.env.EMAIL,
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify your email address"
          : "Reset your password",

      html: `
  <div style="font-family: Arial, sans-serif; background:#f4f4f5; padding:40px;">
    
    <div style="max-width:500px; margin:auto; background:white; border-radius:10px; padding:30px; border:1px solid #e4e4e7;">
      
      <h2 style="text-align:center; color:#111827;">
        ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}
      </h2>

      <p style="color:#374151; font-size:15px;">
        ${emailType === "VERIFY"
          ? "Thank you for signing up! Please confirm your email address by clicking the button below."
          : "We received a request to reset your password. Click the button below to set a new password."
        }
      </p>

      <div style="text-align:center; margin:30px 0;">
        <a href="${url}" 
          style="
            background:#4f46e5;
            color:white;
            padding:12px 22px;
            text-decoration:none;
            border-radius:6px;
            font-weight:600;
            display:inline-block;
          ">
          ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
        </a>
      </div>

      <p style="font-size:14px; color:#6b7280;">
        If the button above does not work, copy and paste this link into your browser:
      </p>

      <p style="word-break:break-all; font-size:13px; color:#4f46e5;">
        ${url}
      </p>

      <hr style="margin:25px 0; border:none; border-top:1px solid #e5e7eb;" />

      <p style="font-size:12px; color:#9ca3af; text-align:center;">
        If you didn’t request this email, you can safely ignore it.
      </p>

    </div>
  </div>
  `,
    };

    const mailresponse = await transporter.sendMail(mainoptions);
    return mailresponse;
  } catch (error) {
    console.log(error);
  }
};
