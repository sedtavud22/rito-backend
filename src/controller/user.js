const fs = require('fs/promises')
const repo = require("../repository");
const utils = require("../utils");
const { CustomError } = require("../config/error");
const uploader = require('../utils/cloudinary')

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
    delete req.user.password;
    res.status(200).json({ user: req.user });
  } catch (err) {
    next(err);
  }
};

module.exports.get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await repo.user.get({ id: +id });
    delete user.password;
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
    console.log(req.body)


    const user = await repo.user.update(
      { id: +id },
      { firstName, lastName, displayName, description, profileImageUrl }
    );
    delete user.password;

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
  return;
};

module.exports.updateProfileImage = async(req,res,next)=>{
  if(!req.file) {
    throw new CustomError("Please select profile picture","WRONG_INPUT", 400);
  }
  const { id }  = req.params
  const profileImage = await uploader.upload(req.file.path)
  console.log(profileImage)
  try{
    const user = await repo.user.update(
      {id:+id},
      {profileImageUrl:profileImage.url}
      )
      delete user.password
      fs.unlink(req.file.path)
      console.log(user)
      res.status(200).json({user})
    }catch(err){
    next(err)
  }
}
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

module.exports.forgotPassword = async (req, res, next) => {
  const { usernameOrEmail } = req.body;

  try {
    const existingUser = await repo.user.get({
      OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    if (!existingUser) {
      return res.status(200).json({
        message: "A password reset request has been sent to your email",
      });
    }

    delete existingUser.password;

    const resetPasswordToken = utils.jwt.signResetPassword(existingUser);

    await repo.user.update(existingUser.id, { resetPasswordToken });

    const message = {
      from: process.env.GOOGLE_APP_EMAIL,
      to: existingUser.email,
      subject: "Reset Account Password Link",
      html: `
      <h3>Hi ${existingUser.username}.</h3>
      <p>We received a request to reset the password for your account.</p>
      <p>To reset your password, click the button below</p>
      <a href='${process.env.WEB_DOMAIN}/reset-password/${resetPasswordToken}' style="text-decoration: none; color: #ffffff; background-color: #ff6e7c; padding: 8px 16px; font-size: 20px;">Reset Password</a>
      `,
    };

    utils.nodeMailer.sendMail(message);
    res.status(200).json({
      message: "A password reset request has been sent to your email",
    });
  } catch (error) {
    next(error);
  }
  return;
};

exports.updatePassword = async (req, res, next) => {
  const { token, password } = req.body;
  try {
    const isRightToken = await repo.user.get({ resetPasswordToken: token });
    if (!isRightToken) {
      throw new CustomError(
        "User with this token does not exist",
        "NOT_FOUND_DATA",
        400
      );
    }

    const decoded = utils.jwt.verifyResetPassword(token);
    const user = await repo.user.get({ id: decoded.id });
    if (!user) {
      throw new CustomError(
        "User with this token does not exist",
        "NOT_FOUND_DATA",
        400
      );
    }

    const isSamePassword = await utils.bcrypt.compare(password, user.password);
    if (isSamePassword) {
      throw new CustomError(
        "New Password can not be the same as old password",
        "INVALID_INPUT",
        400
      );
    }

    const hashed = await utils.bcrypt.hashed(password);

    user.password = hashed;
    user.resetPasswordToken = null;
    await repo.user.update(user.id, user);
    res.status(200).json({ message: "Your password has been changed" });
  } catch (error) {
    next(error);
  }
};
