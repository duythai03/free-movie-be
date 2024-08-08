const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

const generalAccessToken = (payload) => {
  console.log("payload", payload);
  const access_Token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "2h" }
  );
  return access_Token;
};

const generalRefreshToken = (payload) => {
  console.log("payload", payload);
  const refresh_Token = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "365d" }
  );
  return refresh_Token;
};

const refreshTokenJwtService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("token", token);
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({
            status: "ERR",
            message: "Unauthorized",
          });
        }
        const access_token = await generalAccessToken({
          id: user?.id,
        });
        resolve({
          status: "OK",
          message: "success",
          access_token,
        });
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshTokenJwtService,
};
