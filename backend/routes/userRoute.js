const express=require('express');
const { createProductReview, getProductReviews, delteReiview } = require('../controller/productController');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require('../controller/userController');
const router=express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
''
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(logout)

router.route('/me').get(isAuthenticatedUser,getUserDetails)

router.route('/password/update').put(isAuthenticatedUser,updatePassword)

router.route('/me/update').put(isAuthenticatedUser,updateProfile)

router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUsers);

router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getSingleUser).put(isAuthenticatedUser,authorizeRoles('admin'),updateUserRole).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser)

router.route('/review').put(isAuthenticatedUser, createProductReview)

router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser,delteReiview)
module.exports=router