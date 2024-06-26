import { NextResponse } from "next/server";
import { connectDB } from "../../lib/connectDB";
import  User  from "../../models/user";

export async function POST(req) {
    try {
        await connectDB();
        const { email } = await req.json();
        const user = await User.findOne({ email }).select('_id');
        console.log(user)
        
        return NextResponse.json({ user }, { status: 200 });
        
    } catch (error) {
        console.log(error)
    }
}