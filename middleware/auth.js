// middleware/auth.js

module.exports = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  // Replace '12345' with your desired secret key
  if (!apiKey || apiKey !== '12345') {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
  }

  next();
};
