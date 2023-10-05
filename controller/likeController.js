import Like from "../models/Like.js";
import Post from "../models/Post.js";

export const likePost = async (req, res) => {
  try {
    const { postId, likeType } = req.body;
    const userId = req.userId; // Assuming this value is set after JWT verification

    // Check if the user already has any type of like for the post
    const existingLike = await Like.findOne({
      where: { post_id: postId, user_id: userId }
    });

    if (existingLike) {
      // If there's already an existing like type for the user and post, update it
      existingLike.like_type = likeType;
      await existingLike.save();
    } else {
      // If no existing like type, create a new one
      await Like.create({
        post_id: postId,
        user_id: userId,
        like_type: likeType
      });
    }

    // Fetch the post with its likes after performing the like operation
    const updatedPost = await Post.findOne({
      where: { id: postId },
      include: [Like]
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    return res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({
      message: "Error while updating the like.",
      error: error.message
    });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const postId = req.body.postId;
    const userId = req.userId; // Assuming this value is set after JWT verification

    const existingLike = await Like.findOne({
      where: { post_id: postId, user_id: userId }
    });

    if (existingLike) {
      await existingLike.destroy();
      res.status(200).json({ message: "Like removed successfully." });
    } else {
      res.status(404).json({ message: "Like not found." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error while removing the like.",
      error: error.message
    });
  }
};
