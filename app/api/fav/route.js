import { NextResponse } from "next/server";
import { connectDB } from "../../lib/connectDB";
import Favorite from "@/app/models/favorite";
import bcryptjs from "bcryptjs";

export async function POST(req) {
    try {
        const { email, img, title, genre } = await req.json();
        const hashedEmail = await bcryptjs.hash(email, 10);

        await connectDB();
        await Favorite.create({ hashedEmail: hashedEmail, img, title, genre });

        return NextResponse.json({ message: 'Added to favorites' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
