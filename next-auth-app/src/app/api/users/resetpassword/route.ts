import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email} = reqBody

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({message:"This Email not exist"},{status:400})
        }

        await sendEmail({email, emailType:"RESET", userId:user._id })
    
        return  NextResponse.json({message:"Password reset link send on your email", success:true}, {status:200})
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}