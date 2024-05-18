import { NextResponse } from "next/server";
import { connectDB } from "../../lib/connectDB";
import  Favorite  from "../../models/favorite";

export async function POST(req) {
    try {
        await connectDB();
        const { gameId } = await req.json();
        const favorite = await Favorite.findOne({ gameId }).select('_id');
        console.log(favorite)
        
        return NextResponse.json({ favorite }, { status: 200 });
        
    } catch (error) {
        console.log(error)
    }
}