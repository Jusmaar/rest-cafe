
const { Router } = require('express');
const { check } = require('express-validator')
const { usersGet,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch } = require('../controllers/user');
const { isRoleValidate, isEmailExist, isUserExistById } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();


router.get('/', usersGet );

router.put('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(isUserExistById),
  check('role').custom(isRoleValidate),
  validateFields
], usersPut );

router.post('/',[
  check('name', 'El nombre es requerido').not().isEmpty(),
  check('email', 'Formato de correo invalido').isEmail(),
  check('email').custom(isEmailExist),
  check('password', 'El password debe tener minimo 6 caracteres').isLength({ min: 6 }),
  // check('role', 'El role asignado es invalido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(isRoleValidate),
  validateFields
], usersPost );

router.delete('/:id',[
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(isUserExistById),
  validateFields
], usersDelete );

router.patch('/', usersPatch );





module.exports = router;