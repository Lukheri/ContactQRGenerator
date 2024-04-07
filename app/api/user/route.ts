import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
    try {
        const { firstName, lastName, birthdate, gender, address, email, contactNumber, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10)

        await connectMongoDB();

        const user = await User.create({
            firstName,
            lastName,
            birthdate,
            gender,
            address,
            email,
            contactNumber,
            password: hashedPassword
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
