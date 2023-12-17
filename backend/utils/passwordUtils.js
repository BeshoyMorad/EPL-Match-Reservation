import bcrypt from "bcryptjs";

export function hashPassword(password) {
  const hashedPass = bcrypt.hashSync(
    password + process.env.BCRYPT_PASSWORD,
    parseInt(process.env.SALT_ROUNDS)
  );

  return hashedPass;
}

export function comparePasswords(password, dbPassword) {
  const result = bcrypt.compareSync(
    password + process.env.BCRYPT_PASSWORD,
    dbPassword
  );

  return result;
}
