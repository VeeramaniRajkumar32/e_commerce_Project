const jwt = require('jsonwebtoken')

exports.getJwtToken = (id) => {
   return jwt.sign({id:id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1] || req.headers["x-access-token"] || req.cookies.token || localStorage.get('user');
    if (!token) {
      return res.redirect("/")
      console.log("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log(req.user);
    } catch (err) {
      return res.redirect("/")
      console.log("Invalid Token");
    }
    return next();
  };