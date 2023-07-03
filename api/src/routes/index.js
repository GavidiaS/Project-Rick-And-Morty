import { Router } from 'express';
import user from './user.route.js';
import characters from './characters.route.js';
import favorites from './favorites.route.js';

const router = Router();

router.use("/login", user);
router.use("/characters", characters);
router.use("/favorites", favorites);

export default router;