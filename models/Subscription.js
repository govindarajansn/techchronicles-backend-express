import Sequelize from "sequelize";
import db from "../config/dbConfig.js";

const Subscription = db.define(
  "subscriptions",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    user_id: {
      type: Sequelize.UUID,
      references: {
        model: "profiles",
        key: "id"
      },
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

export default Subscription;
