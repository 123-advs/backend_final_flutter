const router = require('express').Router({ mergeParams: true }); // Sử dụng mergeParams để kế thừa các tham số từ router cha
const ctrls = require('../controllers/topic');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/', verifyAccessToken, ctrls.createTopic);
router.get('/:topicId', verifyAccessToken, ctrls.getTopicById);
router.get('/', ctrls.getAllTopic);
router.put('/:topicId', verifyAccessToken, ctrls.updateTopic);
router.delete('/:topicId', verifyAccessToken, ctrls.deleteTopic);
router.get('/topicbyuser/:userId', verifyAccessToken, ctrls.getTopicsByUserId);
router.put('/updatemode/:topicId', verifyAccessToken, ctrls.updateTopicMode);
router.post('/:topicId/add-to-folders', verifyAccessToken, ctrls.addTopicToFolders);
router.delete('/:topicId/remove-from-folders', verifyAccessToken, ctrls.removeTopicFromFolders);
router.get('/mode/public', verifyAccessToken, ctrls.getAllPublicTopic);
router.put('/:topicId/terms/:termId/star', verifyAccessToken, ctrls.updateTopicStar);

module.exports = router;