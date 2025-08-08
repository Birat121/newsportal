import News from "../models/NewsModel.js";
import imagekit from "../config/imagekit.js";

// POST /api/news/multiple
export async function createMultipleNews(req, res) {
  try {
    const newsData = JSON.parse(req.body.newsData);

    if (!Array.isArray(newsData) || newsData.length === 0)
      return res.status(400).json({ message: "newsData must be a non-empty array" });

    if (!req.files || req.files.length !== newsData.length)
      return res.status(400).json({ message: "Number of images must match number of news items" });

    const createdNews = [];

    for (let i = 0; i < newsData.length; i++) {
      const { title, content, category, trending } = newsData[i];
      const file = req.files[i];

      const uploadResponse = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
      });

      const news = new News({
        title,
        content,
        category,
        trending: trending || false,
        imageUrl: uploadResponse.url,
      });

      await news.save();
      createdNews.push(news);
    }

    res.status(201).json({ message: "Multiple news articles created", data: createdNews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

// POST /api/news/single
export async function createNews(req, res) {
  try {
    const { title, content, category, trending } = req.body;
    if (!req.file) return res.status(400).json({ message: "Image file is required" });

    const uploadResponse = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    });

    const news = new News({
      title,
      content,
      category,
      trending: trending === "true",
      imageUrl: uploadResponse.url,
    });

    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET /api/news/getNews
export async function getNews(req, res) {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const newsList = await News.find(filter).sort({ createdAt: -1 });
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET /api/news/getNews/:id
export async function getNewsById(req, res) {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// PUT /api/news/updateNews/:id
export async function updateNews(req, res) {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    let title, content, category, trending;

    // ✅ Handle both multipart (newsData as JSON string) and normal form submission
    if (req.body.newsData) {
      const parsed = JSON.parse(req.body.newsData);
      title = parsed.title;
      content = parsed.content;
      category = parsed.category;
      trending = parsed.trending;
    } else {
      title = req.body.title;
      content = req.body.content;
      category = req.body.category;
      trending = req.body.trending;
    }

    // ✅ Handle image upload if new file is provided
    if (req.file) {
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
      });
      news.imageUrl = uploadResponse.url;
    }

    // ✅ Update fields
    news.title = title ?? news.title;
    news.content = content ?? news.content;
    news.category = category ?? news.category;
    news.trending = trending === "true" || trending === true;

    await news.save();
    res.json(news);
  } catch (err) {
    console.error("Update news error:", err);
    res.status(500).json({ message: err.message });
  }
}


// DELETE /api/news/deleteNews/:id
export async function deleteNews(req, res) {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    res.json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET /api/news/category/:slug?page=1&limit=5
export async function getNewsByCategory(req, res) {
  try {
    const { slug } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const filter = { category: slug };
    const total = await News.countDocuments(filter);
    const news = await News.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);

    res.json({ news, currentPage: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: "Error fetching category news", error: err.message });
  }
}

// GET /api/news/category-section (for homepage)
export async function getNewsByCategoryGroup(req, res) {
  try {
    const categories = ["समाचार", "समाज", "राजनीति", "खेलकुद",  "मनोरंजन",  "प्रदेश"];
    const result = {};

    for (const cat of categories) {
      const news = await News.find({ category: cat }).sort({ createdAt: -1 }).limit(3);
      result[cat] = news;
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching grouped news", error: err.message });
  }
}

// GET /api/news/trending
export async function getTrendingNews(req, res) {
  try {
    const trendingNews = await News.find({ trending: true }).sort({ createdAt: -1 }).limit(10);
    res.json(trendingNews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching trending news" });
  }
}

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalNews = await News.countDocuments();

    const categoryAggregation = await News.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          category: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.json({
      totalNews,
      categoryData: categoryAggregation,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET /api/news/share/:id
export async function getSharePreview(req, res) {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).send("News not found");

    const description = news.content.replace(/<[^>]*>/g, "").substring(0, 160); // strip HTML
    const fullUrl = `https://sevenlakenews.com/news/${news._id}`; // React frontend link

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${news.title}</title>

        <!-- Open Graph -->
        <meta property="og:title" content="${news.title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:image" content="${news.imageUrl}" />
        <meta property="og:url" content="${fullUrl}" />
        <meta property="og:type" content="article" />

        <!-- Redirect after 1 second -->
        <meta http-equiv="refresh" content="1; url=${fullUrl}" />
      </head>
      <body>
        <p>Redirecting to <a href="${fullUrl}">${fullUrl}</a></p>
      </body>
      </html>
    `;

    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (err) {
    console.error("Share preview error:", err);
    res.status(500).send("Internal Server Error");
  }
}
