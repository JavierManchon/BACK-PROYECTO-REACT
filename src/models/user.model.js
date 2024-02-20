import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        //Para que me elimine los espacios y se quede solo con el texto
        trim: true
    },
    email: {
        type: String,
        required: true,
        //Solo se absorbe como valido un email
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);