const repo = require("../repository");
const utils = require("../utils");
const { CustomError } = require("../config/error");
const { Role } = require("@prisma/client");

module.exports.getAll = async (req, res, next) => {
  try {
    const users = await repo.user.getAll();
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
  return;
};

module.exports.getMe = async (req, res, next) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    next(err);
  }
};

module.exports.get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await repo.user.get({ id });
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
  return;
};

module.exports.login = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;
    // GET username from database
    const user = await repo.user.get({
      OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    if (!user) throw new CustomError("invalid credentials", "WRONG_INPUT", 400);

    // COMPARE password with database
    const result = await utils.bcrypt.compare(password, user.password);
    if (!result)
      throw new CustomError("invalid credentials", "WRONG_INPUT", 400);

    // DELETE KEY of password from user data
    delete user.password;
    // SIGN token from user data
    const token = utils.jwt.sign(user);
    res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
  return;
};
module.exports.register = async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, email, isAdmin } =
      req.body;
    const existingUser = await repo.user.get({
      OR: [{ username }, { email }],
    });
    if (existingUser) {
      throw new CustomError(
        "Username or Email already exists",
        "WRONG_INPUT",
        400
      );
    }

    // let role = Role.USER
    // if (req.body.role != Role.ADMIN) role = Role.ADMIN
    // HASHED PASSWORD
    const hashed = await utils.bcrypt.hashed(password);
    // CREATE user to database
    const user = await repo.user.create({
      username,
      displayName: username,
      password: hashed,
      firstName,
      lastName,
      email,
      isAdmin,
    });
    // DELETE KEY of password from user data
    delete user.password;
    // SIGN token from user data
    const token = utils.jwt.sign(user);

    res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
  return;
};
module.exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName,lastName,displayName,description,profileImageUrl } = req.body;
    const user = await repo.user.update(
      { id: +id },
      { firstName,lastName,displayName,description,profileImageUrl }
    );

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
  return;
};
module.exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await repo.user.delete({ id: +id });
    res.status(200).json({ message: `user id:${id} deleted` });
  } catch (err) {
    next(err);
  }
  return;
};
