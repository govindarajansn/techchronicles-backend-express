import Sequelize from "sequelize";
import db from "../config/dbConfig.js";

const Like = db.define(
  "likes",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    post_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: "posts", // Assuming the related table is named 'posts'
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
    like_type: {
      type: Sequelize.ENUM("LIKE", "DISLIKE", "HEART", "FIRE"), // Adjust the values accordingly
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

export default Like;
