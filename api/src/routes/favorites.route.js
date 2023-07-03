import { Router } from "express";
import { postFavMdl, deleteFavMdl } from '../middlewares/favorites.middleware.js';
import { deleteFav, postFav } from "../controllers/favorites.controller.js";

const router = Router();

router.post("/", postFavMdl, postFav);
router.delete("/:id", deleteFavMdl, deleteFav);

export default router;