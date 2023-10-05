import Sequelize from "sequelize";
import db from "../config/dbConfig.js";
import Profile from "./Profile.js";
import Like from "./Like.js";

export const Post = db.define(
  "posts",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW // Set the default value to the current date/time
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "profiles",
        key: "id"
      }
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
);

Post.belongsTo(Profile, {
  foreignKey: "user_id"
});
Profile.hasMany(Post, {
  foreignKey: "user_id"
});

Post.hasMany(Like, { foreignKey: "post_id" });
Profile.hasMany(Like, { foreignKey: "user_id" });
Like.belongsTo(Post, { foreignKey: "post_id" });
Like.belongsTo(Profile, { foreignKey: "user_id" });

export default Post;
