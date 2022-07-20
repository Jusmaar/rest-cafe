const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const usersGet = async (req = request, res = response) => {
  const { from = 0, limit = 3 } = req.query;
  const queryDB = { status: false };

  const [total, users] = await Promise.all([
    User.count(queryDB),
    User.find(queryDB)
    .skip(Number(from))
    .limit(Number(limit))
  ]);
  res.json({
    total,
    users
  })
};

const usersPost = async (req, res = response) => {
  const { name, password, email, role } = req.body;
  const user = new User({ name, password, email, role });
  // Hash password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  // Save DB
  await user.save();
  res.json({
    user,
  });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, email, google, ...user } = req.body;
  if (password) {
    // Hash password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
  }

  const userUpdated = await User.findByIdAndUpdate(id, user);

  res.json({
    userUpdated
  });
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usersPatch",
  });
};

const usersDelete = async (req, res = response) => {
  const { id } = req.params;
  const userDelete = await User.findByIdAndUpdate(id, { status: false });
  res.json(userDelete);
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
