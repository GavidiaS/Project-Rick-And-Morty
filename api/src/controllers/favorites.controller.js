import DB from '../db.js';

const { Favorite, User, UserFavorite } = DB

export async function postFav(req, res) {
  try {
    const { id, name, status, species, gender, origin, location, image, userId } = req.body;
    const [character, created] = await Favorite.findOrCreate({
      where: { name },
      defaults: {
        id,
        name,
        status,
        species,
        gender,
        origin,
        location,
        image
      }
    });
    const user = await User.findByPk(userId);
    await user.addFavorite(character);
    const favorites = await User.findByPk(userId, {
      include: [{ model: Favorite, required: false }]
    });
    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function deleteFav(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    const characterFav = await Favorite.findByPk(id, {
      include: [{ model: User, required: false }]
    });
    if (characterFav.Users.length === 1) {
      await Favorite.destroy({ where: { id } });
    } else {
      await UserFavorite.destroy({
        where: {
          UserId: userId,
          FavoriteId: id
        }
      })
    }
    const favorites = await User.findByPk(userId, {
      include: [{ model: Favorite, required: false }]
    });
    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}