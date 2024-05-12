const router = require('express').Router({ mergeParams: true });
const ctrls = require('../controllers/flashCard');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/', verifyAccessToken, ctrls.createFlashCard);
router.get('/', verifyAccessToken, ctrls.getAllFlashCard);
router.get('/topic/:topicId', verifyAccessToken, ctrls.getFlashCardByTopic);
router.put('/topic/:topicId', verifyAccessToken, ctrls.updateFlashCardByTopic);

module.exports = router;