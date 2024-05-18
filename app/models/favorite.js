import mongoose, { Schema } from "mongoose";

const favoriteSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    gameId: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
})

const Favorite = mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);
export default Favorite;