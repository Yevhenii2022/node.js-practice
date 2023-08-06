module.exports = (rolesArr) => {
  return (req, res, next) => {
    try {
      const { roles } = req.user;
      let hasRole = false;
      roles.forEach((role) => {
        if (rolesArr.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        res.status(403);
        throw new Error("Forbidden");
      }
      next();
    } catch (error) {
      res.status(403).json({ code: 403, message: error.message });
    }
  };
};

/*{
  friends: [ 'Beer', 'Vodka', '777' ],
  id: '64cf9afe144d09d8f8f8de6a',
  roles: [ 'ADMIN' ],
  iat: 1691327459,
  exp: 1691338259
} */
