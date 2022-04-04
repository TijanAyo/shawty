const PromiseWrapper = require("../helpers/promise-wrapper");
const ShortUrl = require("../model/shorturl");

const mapUrlToId = async (req, res, next) => {
  const { id } = req.params;
  const query = ShortUrl.findOne({ short_url: id }).exec();
  const [shawt_url, error] = await PromiseWrapper(query);

  if (error) return next(error);
  if (shawt_url == undefined)
    return res.status(404).json({ message: "Your short url not found" });
  return res.redirect(shawt_url.full_url);
};

module.exports = mapUrlToId;
