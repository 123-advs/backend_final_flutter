const router = require('express').Router({ mergeParams: true });
const ctrls = require('../controllers/testChoice');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/', verifyAccessToken, ctrls.createTestChoice);
router.get('/topic/:topicId', verifyAccessToken, ctrls.getChoicesByTopic);

module.exports = router;