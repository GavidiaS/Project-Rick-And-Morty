import { Router } from 'express';
import { getAllCharacters, getCharacterById } from '../controllers/characters.controller.js';

const router = Router();

router.get("/", getAllCharacters);
router.get("/:id", getCharacterById);

export default router;