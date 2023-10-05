import Sequelize from "sequelize";
import db from "../config/dbConfig.js";

const Profile = db.define(
  "profiles",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4 // Automatically generate unique UUIDs
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // Ensuring emails are unique
      validate: {
        isEmail: true
      }
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    image_url: {
      type: Sequelize.STRING
    },
    github_url: {
      type: Sequelize.STRING
    },
    linkedin_url: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

export default Profile;
