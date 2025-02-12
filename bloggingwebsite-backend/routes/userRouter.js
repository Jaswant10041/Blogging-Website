const router=require('express').Router();
const userController=require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');

router.post('/users/register',userController.userRegister);
router.post('/users/login',userController.userLogin);
router.get('/users/user',verifyJWT, userController.getCurrentUser);
router.put('/users/update',userController.updateUserData);
module.exports=router;