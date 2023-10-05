import Post from "../models/Post.js";
import Profile from "../models/Profile.js";
import Like from "../models/Like.js";

export const createPost = async (req, res) => {
  try {
    const { content, tags } = req.body;

    // Create the new post
    const createdPost = await Post.create({
      user_id: req.userId,
      content,
      tags,
      created_at: new Date().toLocaleString()
    });

    // Fetch the post again to include associated details
    const newPost = await Post.findOne({
      where: { id: createdPost.id }, // Get the post by its ID
      include: [
        {
          model: Profile // Include details of the associated Profile
        },
        {
          model: Like,
          as: "likes",
          attributes: ["like_type", "user_id"] // Only include specific attributes
        }
      ]
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({
      message: "Error creating post.",
      error: error.message
    });
  }
};

export const editPost = async (req, res) => {
  try {
    const { postId, content, tags } = req.body;

    console.log(postId);

    const post = await Post.findOne({ where: { id: postId } });

    console.log(post.user_id, req.userId);
    if (!post || post.user_id !== req.userId) {
      return res
        .status(404)
        .json({ message: "Post not found or unauthorized." });
    }

    post.content = content;
    post.tags = tags;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Error updating post.",
      error: error.message
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.body;

    const post = await Post.findOne({ where: { id: postId } });

    if (!post || post.user_id !== req.userId) {
      return res
        .status(404)
        .json({ message: "Post not found or unauthorized." });
    }

    await post.destroy();

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting post.",
      error: error.message
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Profile // This will include all details of the associated Profile
        },
        {
          model: Like,
          as: "likes",
          attributes: ["like_type", "user_id"]
        }
      ]
    });

    const formattedPosts = posts.map((post) => {
      const postObject = post.get({ plain: true });
      postObject.likeCount = parseInt(postObject.likeCount, 10);
      return postObject;
    });

    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching all posts.",
      error: error.message
    });
  }
};
