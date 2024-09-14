const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!name || !email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "All fields are required",
      });
    } else if (isCheckEmail === false) {
      return res.status(200).json({
        status: "ERR",
        message: "Email is invalid",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "Password and Confirm Password are not match",
      });
    }
    const result = await UserService.createUser(req.body);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "All fields are required",
      });
    } else if (isCheckEmail === false) {
      return res.status(200).json({
        status: "ERR",
        message: "Email is invalid",
      });
    }
    const result = await UserService.loginUser(req.body);
    const { refresh_token, ...newResult } = result;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      samesite: "none",
      secure: true,
      maxAge: 15552000,
    });
    return res.status(200).json(newResult);
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const result = await UserService.updateUser(userId, data);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const result = await UserService.deleteUser(userId);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

const getDetailsUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const result = await UserService.getDetailsUser(userId);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

const refreshToken = async (req, res) => {
  console.log("req.cookies", req.cookies.refresh_Token);
  try {
    const token = req.cookies.refresh_token;
    console.log("token", token);
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const result = await JwtService.refreshTokenJwtService(token);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Logout successfully",
    });
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getDetailsUser,
  refreshToken,
  logoutUser,
};
