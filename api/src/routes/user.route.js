import { Router } from 'express';
import { login, register } from '../controllers/user.controller.js';
import { loginMdl, registerMdl } from '../middlewares/user.middleware.js';

const router = Router();

router.get("/", loginMdl, login);
router.post("/", registerMdl, register);

export default router;