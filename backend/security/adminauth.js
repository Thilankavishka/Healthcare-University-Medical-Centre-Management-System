const jwt = require("jsonwebtoken");

const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.token; //frontend part
  /*const authHeader = req.headers["authorization"]; //postman part
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  const token = authHeader.split(" ")[1];*/
  if (!token) {
    return res.json({ message: "Enter Admin Token" });
  } else {
    jwt.verify(token, process.env.admin_key, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid Token" });
      } else {
        req.username = decoded.username;
        req.role = decoded.role;
        next();
      }
    });
  }
};
module.exports = verifyAdmin;
