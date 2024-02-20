import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now},
    //Las tareas tambien van asociadas a cada usuario para que a cada uno le paarezcan sus tareas, asignamos a la tarea un usuario que obtenemos por id
    game: {type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true}
}, {
    timestamps: true
});

export default mongoose.model('Task', taskSchema);