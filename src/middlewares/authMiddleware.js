const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

const authMiddleware = (req, res, next) => {
  if (!req.headers.token) {
    return res.status(401).json({
      status: "ERR",
      message: "User has not logged in",
    });
  } else {
    const token = req.headers.token.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
      if (err) {
        return res.status(401).json({
          status: "ERR",
          message: "Unauthorized",
        });
      } else {
        req.user = user; // Gắn thông tin user vào req.user
        next();
      }
      console.log("user", user);
      console.log("req.user", req.user);
    });
  }
};

const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
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
    console.log("user", user); // Bạn có thể bỏ console.log sau khi kiểm tra
  });
};

module.exports = { authMiddleware, authUserMiddleware };
