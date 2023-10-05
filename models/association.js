import Post from "./Post.js";
import Profile from "./Profile.js";

Post.belongsTo(Profile, { foreignKey: "user_id" });
Profile.hasMany(Post, { foreignKey: "user_id" });
