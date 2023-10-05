import Sequelize from "sequelize";
import db from "../config/dbConfig.js";

const Rating = db.define(
  "ratings",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    rating: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    blog_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: "blogs", // Assuming the related table is named 'blogs'
        key: "id"
      }
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "profiles", // Assuming the User table is named 'users' and its id is of UUID type
        key: "id"
      }
    },
    review_text: {
      type: Sequelize.STRING,
      allowNull: true // Assuming the review text can be null
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
);

export default Rating;
