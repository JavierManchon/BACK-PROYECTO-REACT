import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    picture:{
        type: String
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Game', gameSchema);