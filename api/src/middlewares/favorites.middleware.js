export function postFavMdl(req, res, next) {
  const { id, name, status, species, gender, origin, location, image, userId } = req.body;
  if (!id || !name || !status || !species || !gender || !origin || !location || !image || !userId) return res.status(404).json({ message: "Data is missing" });
  next();
}

export function deleteFavMdl(req, res, next) {
  const { id } = req.params;
  const { userId } = req.query;
  if (!id || !userId) return res.status(404).json({ message: "Data is missing" });
  next();
}