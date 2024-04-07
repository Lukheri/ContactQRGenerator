import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req: NextRequest) {
    try {
        const { firstName, lastName, birthdate, gender, address, email, contactNumber, password } = await req.json();

        await connectMongoDB();

        const user = await User.create({
            firstName,
            lastName,
            birthdate,
            gender,
            address,
            email,
            contactNumber,
            password
        });

        return NextResponse.json({
            message: "User created successfully",
            id: user._id
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating user:", error);

        return NextResponse.json(
            { message: "Error creating user" }, 
            { status: 500 }
        );
    }
}
