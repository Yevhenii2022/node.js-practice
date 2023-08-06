const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const [tokenType, token] = req.headers.authorization.split(" ");
    if (tokenType === "Bearer" && token) {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(401).json({ code: 401, message: error.message });
  }
};

/* 
{
  friends: [ 'Beer', 'Vodka', '777' ],
  id: '64cf8ce83be48bd3f4ec729e',     
  iat: 1691324588,
  exp: 1691335388
}
*/
