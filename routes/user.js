const router = require('express').Router()
const User = require('../models/user');
const ctrls = require('../controllers/user')
const { verifyAccessToken } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post('/register', ctrls.register)
router.post('/register/verify', ctrls.verifyCode)
router.post('/login', ctrls.login)
router.get('/current', verifyAccessToken, ctrls.getCurrent)
router.post('/refreshtoken', ctrls.refreshAccessToken)
router.get('/', ctrls.getUsers)
router.get('/logout', verifyAccessToken, ctrls.logout)
router.post('/forgotpassword', ctrls.forgotPassword)
router.put('/resetpassword', ctrls.resetPassword)
router.put('/changepassword', verifyAccessToken, ctrls.changePassword);
router.put('/updateuser/:_id', verifyAccessToken, ctrls.updateUser);
router.put('/updateimage', verifyAccessToken, uploader.single('image'), ctrls.updateImage);
router.get('/:userId', verifyAccessToken, ctrls.getUserById)
router.post('/:userId/:topicId', verifyAccessToken, ctrls.addToTopicSaved);
router.delete('/:userId/:topicId', verifyAccessToken, ctrls.deleteToTopicSaved);

module.exports = router

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE
//CREATE (POST) + PUT - body
//GET + DELETE - query 
