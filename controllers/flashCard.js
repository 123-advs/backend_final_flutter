const FlashCard = require('../models/flashCard');
const asyncHandler = require('express-async-handler');

const createFlashCard = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing input');

    const newFlashCard = await FlashCard.create({ ...req.body });

    return res.status(200).json({
        success: newFlashCard ? true : false,
        createdFlashCard: newFlashCard ? newFlashCard : 'Cannot create new Flash Card'
    });
});

const getFlashCardByTopic = asyncHandler(async (req, res) => {
    const { topicId } = req.params;

    const flashCard = await FlashCard.find({ topic: topicId });

    return res.status(200).json({
        success: true,
        flashCards: flashCard,
    });
});

const updateFlashCardByTopic = asyncHandler(async (req, res) => {
    const { topicId } = req.params;
    const { termKnew, termStudy, optionAnswer, user } = req.body;

    // Tìm và cập nhật thẻ flash theo topicId
    const updatedFlashCard = await FlashCard.findOneAndUpdate(
        { topic: topicId, user: user },
        { termKnew: termKnew, termStudy: termStudy, optionAnswer: optionAnswer },
        { new: true }
    );

    if (!updatedFlashCard) {
        return res.status(404).json({ success: false, message: 'Flash card not found for the given topic and user.' });
    }

    return res.status(200).json({ success: true, updatedFlashCard });
});

const getAllFlashCard = asyncHandler(async (req, res) => {
    const flashCard = await FlashCard.find();
    return res.status(200).json({
        success: flashCard ? true : false,
        allFlashCard: flashCard ? flashCard : 'Cannot get all Flash Card'
    });
});

module.exports = {
    createFlashCard,
    getFlashCardByTopic,
    updateFlashCardByTopic,
    getAllFlashCard
};
