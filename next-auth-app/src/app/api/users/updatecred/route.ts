import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request: NextRequest) {
  await connect();

  try {
    const reqBody = await request.json();
    const { email, username } = reqBody;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required", success: false },
        { status: 400 }
      );
    }

    const updateFields: any = {};

    if (username) updateFields.username = username;

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { message: "No fields provided to update", success: false },
        { status: 400 }
      );
    }

    // Update user
    const updatedUser = await User.findOneAndUpdate(
      { email },
      updateFields,
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User updated successfully",
        success: true,
        data: updatedUser,
      },
      { status: 200 }
    );

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}