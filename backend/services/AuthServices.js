import jwt from "jsonwebtoken";
class AuthServices {
  static getPayload = (req) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(" ")[1];
    return jwt.verify(token, process.env.TOKEN_SECRET);
  };
}

export default AuthServices;
