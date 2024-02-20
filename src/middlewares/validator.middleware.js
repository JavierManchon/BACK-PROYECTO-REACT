export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        //mapeo los resultados de error para sacar solo los mensajes qu enecesito y no todo el lio
        return res.status(400).json(error.errors.map(error => error.message));
    }
}