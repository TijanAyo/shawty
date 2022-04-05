const PromiseWrapper = require("../helpers/promise-wrapper");
const ShortUrl = require("../model/shorturl");

const getAllUsersUrl = async (req, res, next) => {
  const query = ShortUrl.find({ user_ip: req.ip }).sort("-createdAt").exec();
  const [short_url, error] = await PromiseWrapper(query);
  if (error) return next(error);
  return res.render("index", { title: "Short URL's | Shawty", short_url });
};

module.exports = getAllUsersUrl;
