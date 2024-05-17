import { NextResponse } from "next/server";
import { connectDB } from "../../lib/connectDB";
import Favorite from "@/app/models/favorite";
import bcryptjs from "bcryptjs";
import base64url from "base64url";

export async function POST(req) {
    try {
        const { id, img, title, genre } = await req.json();

        await connectDB();
        await Favorite.create({ id, img, title, genre });

        return NextResponse.json({ message: 'Added to favorites' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        await connectDB();
        const favorites = await Favorite.find({ id });

        return NextResponse.json(favorites, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}