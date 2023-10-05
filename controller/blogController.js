import Blog from "../models/Blog.js";
import Rating from "../models/Rating.js";

import { Op } from "sequelize";

export const filterByTags = async (req, res) => {
  try {
    const tags = req.query.tags;

    if (!tags) {
      return res.status(400).json({
        message: "Please provide tags for filtering."
      });
    }

    // Convert the tags query string into an array.
    // Assuming tags are sent as a comma-separated list e.g. ?tags=AI,tech
    const tagsArray = tags.split(",");

    const blogs = await Blog.findAll({
      where: {
        tags: {
          [Op.overlap]: tagsArray // overlap checks if there's an overlap between provided array and stored array
        }
      }
    });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while filtering blogs by tags.",
      error: error.message
    });
  }
};

export const searchCompanyBlogs = async (req, res) => {
  try {
    const searchTerm = req.query.search;

    console.log(searchTerm);
    if (!searchTerm) {
      return res.status(400).json({
        message: "Please provide a search term."
      });
    }

    const blogs = await Blog.findAll({
      where: {
        name: { [Op.iLike]: `%${searchTerm}%` }
      }
    });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while searching for blogs.",
      error: error.message
    });
  }
};

export const getCompanyBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const searchTerm = req.query.search || "";

    const whereClause = {};
    if (searchTerm) {
      whereClause.name = { [Op.like]: `%${searchTerm}%` }; // Assuming 'title' is a field in your Blog model
    }

    const blogs = await Blog.findAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      include: [
        {
          model: Rating,
          as: "ratings"
        }
      ]
    });

    const totalBlogs = await Blog.count({ where: whereClause });

    res.status(200).json({
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
      totalBlogs,
      limit,
      offset,
      blogs
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching blogs.",
      error: error.message
    });
  }
};
