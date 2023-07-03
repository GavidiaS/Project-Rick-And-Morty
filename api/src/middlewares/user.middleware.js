export function loginMdl(req, res, next) {
  const { email, password } = req.query;
  if (!email || !password) return res.status(404).json({ message: "Data is missing" });
  next();
}

export function registerMdl(req, res, next) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(404).json({ message: "Data is missing" });
  next();
}