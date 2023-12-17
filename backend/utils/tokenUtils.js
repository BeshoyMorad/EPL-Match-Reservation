import jwt from "jsonwebtoken";

export function generateJWT(user) {
  try {
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.TOKEN_SECRET
    );

    return token;
  } catch (error) {
    throw new Error("Failed to create a token");
  }
}
