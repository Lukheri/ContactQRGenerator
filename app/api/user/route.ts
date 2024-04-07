import { NextRequest, NextResponse } from "next/server"
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req: NextRequest){
    try {
        const {name, description, exercises, userEmail} = await req.json()

        await connectMongoDB()

        await User.create({name, description, exercises, userEmail})
        
        return NextResponse.json({message: "User created"}, {status:201})
    } catch (error) {
        return NextResponse.json(
            {message: "Error creating routine"}, {status: 500}
        )
    }
}