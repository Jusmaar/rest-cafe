const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: true,
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },
  status: {
    type: Boolean,
    default: false
  },
  google: {
    type: Boolean,
    default: false
  }
});

UserSchema.methods.toJSON = function () {
  const { password, __v, ...user } = this.toObject();
  return user;
}

module.exports = model('User', UserSchema)