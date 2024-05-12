const router = require('express').Router({ mergeParams: true }); // Sử dụng mergeParams để kế thừa các tham số từ router cha
const ctrls = require('../controllers/folder');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/', verifyAccessToken, ctrls.createFolder);
router.get('/:folderId', ctrls.getFolder);
router.get('/', ctrls.getAllFolder);
router.put('/:folderId', verifyAccessToken, ctrls.updateFolder);
router.delete('/:folderId', verifyAccessToken, ctrls.deleteFolder);
router.get('/folderbyuser/:userId', verifyAccessToken, ctrls.getFoldersByUserId);
router.post('/:folderId/topics', verifyAccessToken, ctrls.addTopicsToFolder);
router.delete('/:folderId/topics', verifyAccessToken, ctrls.deleteTopicsFromFolder);

module.exports = router;