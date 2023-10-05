import Favorite from "../models/Favorite.js";
import Blog from "../models/Blog.js";

export const toggleFavorite = async (req, res) => {
  try {
    const { companyBlogId } = req.body;

    // Check if the favorite entry already exists for this user and company blog
    let favorite = await Favorite.findOne({
      where: {
        user_id: req.userId,
        company_blog_id: companyBlogId
      }
    });

    if (!favorite) {
      // If no favorite entry, create one with is_favorite set to true
      favorite = await Favorite.create({
        user_id: req.userId,
        company_blog_id: companyBlogId,
        is_favorite: true
      });
      return res
        .status(201)
        .json({ message: "Company Blog marked as favorite.", data: favorite });
    } else {
      // If a favorite entry exists, toggle the is_favorite value
      favorite.is_favorite = !favorite.is_favorite;
      await favorite.save();
      return res.status(200).json({
        message: favorite.is_favorite
          ? "Company Blog marked as favorite."
          : "Company Blog unchecked from favorites.",
        data: favorite
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error toggling favorite status.",
      error: error.message
    });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const userId = req.userId;

    // Retrieve all favorite entries for this user where is_favorite is true
    const favorites = await Favorite.findAll({
      where: {
        user_id: userId,
        is_favorite: true
      },
      include: [Blog]
    });

    if (!favorites || favorites.length === 0) {
      return res
        .status(200)
        .json({ message: "No favorite blog posts found.", data: [] });
    } else {
      return res.status(200).json(favorites);
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching favorite blog posts.",
      error: error.message
    });
  }
};
