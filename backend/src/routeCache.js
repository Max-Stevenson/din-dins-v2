const NodeCache = require("node-cache");

const cache = new NodeCache();

module.exports = (duration) => (req, res, next) => {
  if (req.method !== "GET") {
    return next();
  }

  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    console.log("here");
    return res.send(cachedResponse);
  }

  res.originalSend = res.send;
  res.send = (body) => {
    console.log("here too");
    res.originalSend(body);
    cache.set(key, body, duration);
  };
  return next();
};
