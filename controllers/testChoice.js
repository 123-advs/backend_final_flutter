const TestChoice = require('../models/testChoice');
const Topic = require('../models/topic');
const asyncHandler = require('express-async-handler');

const createTestChoice = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing input');

    // Tính toán overall dựa trên số lượng kết quả có result là true
    const overall = req.body.answers.reduce((acc, curr) => {
        if (curr.result === true) {
            return acc + 1;
        }
        return acc;
    }, 0);

    // Tạo mới TestChoice với overall tính được
    const newTestChoice = await TestChoice.create({ ...req.body, overall });

    return res.status(200).json({
        success: newTestChoice ? true : false,
        createdTestChoice: newTestChoice ? newTestChoice : 'Cannot create new Test Choice'
    });
});

const getChoicesByTopic = asyncHandler(async (req, res) => {
    const { topicId } = req.params;

    // Tìm các lựa chọn thử có chủ đề là topicId
    const choices = await TestChoice.find({ topic: topicId });

    return res.status(200).json({
        success: true,
        choices: choices,
    });
});

const getTestChoiceByUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const testChoice = await TestChoice.find({ user: userId });
    return res.status(200).json({
        success: testChoice ? true : false,
        testChoice: testChoice ? testChoice : 'Cannot get Test Choice'
    });
});

module.exports = {
    createTestChoice,
    getChoicesByTopic,
    getTestChoiceByUser
};