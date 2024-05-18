import { NextResponse } from "next/server";
import { connectDB } from "../../lib/connectDB";
import Favorite from "@/app/models/favorite";

export async function POST(req) {
    try {
        const { id, gameId, img, title, genre } = await req.json();

        await connectDB();
        await Favorite.create({ id, gameId, img, title, genre });

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

export async function DELETE(req) {
    try {
        const url = new URL(req.url);
        const gameId = url.searchParams.get('id');

        await connectDB();
        await Favorite.deleteOne({ gameId });

        return NextResponse.json({ message: 'Deleted from favorites' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}