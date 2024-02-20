import Game from '../models/game.model.js';
import User from '../models/user.model.js';

export const getGames = async (req, res) => {
    const games = await Game.find({
        //Me da solo las tareas del usuario asociado
        user: req.user.id
    }).populate('tasks');
    res.json(games);
};

export const createGame = async (req, res) => {

    try {
    const gamePicture = req.file ? req.file_url : null;
    const {title, rating, review} = req.body; // obtengo los datos a traves del body

    console.log(req.user);

    const newGame = new Game({
        title,
        rating, 
        review,
        picture: gamePicture,
        //Este dato se recupera del jwt.verify en Validate Token
        user: req.user.id
    })
    await newGame.save()

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { $push: { games: newGame._id } },
        { new: true }
      );
  
      // Una vez he creado el nuevo juego y lo he guardado, lo añado a la lista de juegos que tenga a traves del Id que he generado
      //Lo siguiente es geenrar la respuesta que me da el servidor
      res.status(201).json({
        success: true,
        message: 'Game added successfully',
        game: newGame,
        user: user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
};


export const getGame = async (req, res) => {
    try {
      const gameId = req.params.id; // Si necesito el id, obtengo el id del juego a traves de la url
  
      // Busco el juego por su id y le relleno la parte de task con las tareas asociadas a el
      const game = await Game.findById(gameId).populate('tasks');
  
      if (!game) {
        return res.status(404).json({
          success: false,
          message: 'Game not found',
        });
      }
  
      // Enviar el juego al cliente
      res.status(200).json({
        success: true,
        game: game,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };

  export const deleteGame = async (req, res) => {
    try {
      const gameId = req.params.id;
  
      const deletedGame = await Game.findByIdAndDelete(gameId);
  
      if (!deletedGame) {
        return res.status(404).json({
          success: false,
          message: 'Game not found',
        });
      }
  
      console.log('Deleted game:', deletedGame);
  
      res.status(200).json({
        success: true,
        message: 'Game deleted successfully',
        game: deletedGame,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };
  


export const updateGame = async (req, res) => {
    try {
      const gameId = req.params.id; 
      const updateData = req.body; // Necesito obtener los datos actualizados a traves del body
  
      // Actualizar el juego por su Id
      const updatedGame = await Game.findByIdAndUpdate(gameId, updateData, { new: true });
  
      if (!updatedGame) {
        return res.status(404).json({
          success: false,
          message: 'Game not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Game updated successfully',
        game: updatedGame,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };