import express from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getGames, createGame, getGame, updateGame, deleteGame } from '../controllers/game.controller.js';
import { createGameSchema } from '../schemas/game.schema.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import {upload, uploadToCloudinary} from '../middlewares/file.middlewares.js';

const router = express.Router();

router.get('/games', authRequired, getGames);
router.post('/add-game', authRequired,[upload.single('picture'), uploadToCloudinary], validateSchema(createGameSchema), createGame);
router.get('/games/:id', authRequired, getGame);
router.put('/games/:id', authRequired, updateGame);
router.delete('/games/:id', authRequired, deleteGame);

export default router;