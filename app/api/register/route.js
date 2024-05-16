import { NextResponse } from "next/server";
import { connectDB } from "../../lib/connectDB";
import  User  from "../../models/user";
import bcryptjs from "bcryptjs"

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await bcryptjs.hash(password, 10);

        await connectDB();
        await User.create({ name, email, password: hashedPassword });

        return NextResponse.json({ massage: 'User Registered' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}