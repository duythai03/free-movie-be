const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

const authMiddleware = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({
      status: "ERR",
      message: "User has not logged in",
    });
  } else {
    const parsedToken = token.split(" ")[1];
    jwt.verify(parsedToken, process.env.ACCESS_TOKEN, function (err, user) {
      if (err) {
        return res.status(401).json({
          status: "ERR",
          message: "Unauthorized",
        });
      } else {
        req.user = user; // Gắn thông tin user vào req.user
        next();
      }
    });
  }
};

const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      status: "ERR",
      message: "User has not logged in",
    });
  }

  // Kiểm tra token có dạng đúng (ví dụ: "Bearer <token>")
  if (!token.includes(" ")) {
    return res.status(401).json({
      status: "ERR",
      message: "Invalid token format",
    });
  }

  const parsedToken = token.split(" ")[1];
  const userId = req.params.id;

  jwt.verify(parsedToken, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(401).json({
        status: "ERR",
        message: "Unauthorized",
      });
    }
    if (user?.id === userId) {
      req.user = user; // Gắn thông tin user vào req.user
      next();
    } else {
      return res.status(401).json({
        status: "ERR",
        message: "Unauthorized",
      });
    }
  });
};

module.exports = { authMiddleware, authUserMiddleware };
