import { NextRequest, NextResponse } from "next/server"
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function GET(req: NextRequest,{ params }: { params: { id: number } } ){
    try {
        await connectMongoDB()

        const data = await User.findById(params.id)
        
        return NextResponse.json({message: "Routine fetched", data: data}, {status:201})
    } catch (error) {
        return NextResponse.json(
            {message: "Error getting routine"}, {status: 500}
        )
    }
}