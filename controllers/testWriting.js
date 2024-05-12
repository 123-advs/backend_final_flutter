const TestWriting = require('../models/testWriting');
const Topic = require('../models/topic');
const asyncHandler = require('express-async-handler');

const createTestWriting = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing input');

    // Tính toán overall dựa trên số lượng kết quả có result là true
    const overall = req.body.answers.reduce((acc, curr) => {
        if (curr.result === true) {
            return acc + 1;
        }
        return acc;
    }, 0);

    // Tạo mới TestWriting với overall tính được
    const newTestWriting = await TestWriting.create({ ...req.body, overall });

    return res.status(200).json({
        success: newTestWriting ? true : false,
        createdTestWriting: newTestWriting ? newTestWriting : 'Cannot create new Test Writing'
    });
});

const getWritingsByTopic = asyncHandler(async (req, res) => {
    const { topicId } = req.params;

    // Tìm các lựa chọn thử có chủ đề là topicId
    const writings = await TestWriting.find({ topic: topicId });

    return res.status(200).json({
        success: true,
        writings: writings,
    });
});


module.exports = {
    createTestWriting,
    getWritingsByTopic
};