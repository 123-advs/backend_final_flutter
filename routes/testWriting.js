const router = require('express').Router({ mergeParams: true });
const ctrls = require('../controllers/testWriting');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/', verifyAccessToken, ctrls.createTestWriting);
router.get('/user/:userId', verifyAccessToken, ctrls.getTestWritingByUser);
router.get('/topic/:topicId', verifyAccessToken, ctrls.getWritingsByTopic);

module.exports = router;