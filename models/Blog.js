import Sequelize from "sequelize";
import db from "../config/dbConfig.js";
import Rating from "./Rating.js";

const Blog = db.define(
  "blogs",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    created_at: {
      type: Sequelize.DATE
    },
    name: {
      type: Sequelize.STRING
    },
    blogurl: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

Rating.belongsTo(Blog, {
  foreignKey: "blog_id"
});

Blog.hasMany(Rating, {
  foreignKey: "blog_id"
});

export default Blog;
