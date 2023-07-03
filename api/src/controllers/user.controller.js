import DB from '../db.js';

const { User, Favorite } = DB;

export async function login(req, res) {
  try {
    const { email, password } = req.query;
    const user = await User.findOne({
      where: { email },
      include: [{ model: Favorite, required: false }]
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password !== password) return res.status(403).json({ message: "Incorrect password" });
    return res.status(200).json({ access: true, user: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        email,
        password
      }
    });
    if (!created) return res.status(403).json({ message: "Your email is already registered" });
    return res.status(200).json({ registered: "Successfully registered user" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}