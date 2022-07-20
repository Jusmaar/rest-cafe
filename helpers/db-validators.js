const Role = require('../models/role');
const User = require('../models/user');

const isRoleValidate = async(role = '') => {
  const roleExist = await Role.findOne({ role })
  if (!roleExist) {
    throw new Error(`El rol ${role} no esta registrado`)
  }
}

const isEmailExist = async(email = '') => {
  const emailFound = await User.findOne({ email });
  if (emailFound) {
    throw new Error('El email ingresado ya existe')
  }
}

const isUserExistById = async(id) => {
  const userFound = await User.findById(id);
  if (!userFound) {
    throw new Error(`El id ${id} no existe`)
  }
}

module.exports = {
  isRoleValidate,
  isEmailExist,
  isUserExistById
}