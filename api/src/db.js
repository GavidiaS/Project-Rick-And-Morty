import 'dotenv/config';
import { Sequelize } from "sequelize";
import { users, favorites } from './models/index.js';

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, { logging: false, native: false });

users(sequelize);
favorites(sequelize);

const { User, Favorite } = sequelize.models;

User.belongsToMany(Favorite, { through: "UserFavorite", timestamps: false });
Favorite.belongsToMany(User, { through: "UserFavorite", timestamps: false });

export default {
  ...sequelize.models,
  db: sequelize
};