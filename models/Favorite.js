import Sequelize from "sequelize";
import db from "../config/dbConfig.js";
import Blog from "./blog.js";

const Favorite = db.define(
  "favorites",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    company_blog_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: "blogs", // Assuming the related table is named 'company_blogs'
        key: "id"
      }
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "profiles", // Assuming the User table is named 'users'
        key: "id"
      }
    },
    is_favorite: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
);

Blog.hasMany(Favorite, {
  foreignKey: "company_blog_id"
});

Favorite.belongsTo(Blog, {
  foreignKey: "company_blog_id"
});

export default Favorite;
