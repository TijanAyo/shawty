const PromiseWrapper = require("../helpers/promise-wrapper");
const ShortUrl = require("../model/shorturl");

const shortenUrl = async (req, res, next) => {
  const { fullUrl } = req.body;
  if (!fullUrl) return res.status(401).end();
  const new_shawty = new ShortUrl({ full_url: fullUrl, user_ip: req.ip });
  const [savedUser, error] = await PromiseWrapper(new_shawty.save());
  if (error) return next(error);
  return res.redirect("/");
};

module.exports = shortenUrl;
