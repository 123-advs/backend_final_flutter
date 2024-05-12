const Topic = require('../models/topic');
const Folder = require('../models/folder');
const User = require('../models/user')
const asyncHandler = require('express-async-handler');

const createTopic = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing input');

    const newTopic = await Topic.create({ ...req.body });
    return res.status(200).json({
        success: newTopic ? true : false,
        createdTopic: newTopic ? newTopic : 'Cannot create new Topic'
    });
});

const getTopicById = asyncHandler(async (req, res) => {
    const { topicId } = req.params;
    const topic = await Topic.findOne({ _id: topicId });
    return res.status(200).json({
        success: topic ? true : false,
        topicData: topic ? topic : 'Cannot get topic'
    });
});

const getTopicsByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ success: false, error: 'Missing user id' });
    }

    const topics = await Topic.find({ user: userId });
    return res.status(200).json({
        success: topics ? true : false,
        topics: topics ? topics : 'Cannot get topics for this user'
    });
});

const getAllTopic = asyncHandler(async (req, res) => {
    const topic = await Topic.find();
    return res.status(200).json({
        success: topic ? true : false,
        allTopics: topic ? topic : 'Cannot get all topic'
    });
});

const getAllPublicTopic = asyncHandler(async (req, res) => {
    const publicTopics = await Topic.find({ mode: 'public' });
    return res.status(200).json({
        success: true,
        topics: publicTopics ? publicTopics : 'Cannot get public topics'
    });
});

const updateTopic = asyncHandler(async (req, res) => {
    const { topicId } = req.params;
    const updatedTopic = await Topic.findOneAndUpdate({ _id: topicId }, req.body, { new: true });
    return res.status(200).json({
        success: updatedTopic ? true : false,
        updatedTopic: updatedTopic ? updatedTopic : 'Cannot update Topic'
    });
});

const deleteTopic = asyncHandler(async (req, res) => {
    const { topicId } = req.params;

    try {
        const foldersToUpdate = await Folder.find({ topics: topicId });

        foldersToUpdate.forEach(async (folder) => {
            folder.topics.pull(topicId);
            await folder.save();
        });

        // Tiến hành xóa chủ đề từ module Topic
        const deletedTopic = await Topic.findOneAndDelete({ _id: topicId });

        return res.status(200).json({
            success: deletedTopic ? true : false,
            deletedTopic: deletedTopic ? deletedTopic : 'Cannot delete Topic'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

const updateTopicMode = asyncHandler(async (req, res) => {
    const { topicId } = req.params;
    const { mode } = req.body;

    try {
        const updatedTopic = await Topic.findOneAndUpdate(
            { _id: topicId },
            { mode: mode },
            { new: true }
        );

        if (updatedTopic) {
            return res.status(200).json({
                success: true,
                updatedTopic: updatedTopic
            });
        } else {
            return res.status(404).json({
                success: false,
                error: 'Topic not found'
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

const addTopicToFolders = asyncHandler(async (req, res) => {
    const { topicId } = req.params;
    const { folderIds } = req.body;

    if (!topicId || !folderIds || !Array.isArray(folderIds) || folderIds.length === 0) {
        return res.status(400).json({ success: false, error: 'Missing topicId or folderIds' });
    }

    const topic = await Topic.findById(topicId);

    if (!topic) {
        return res.status(404).json({ success: false, error: 'Topic not found' });
    }

    const promises = folderIds.map(async (folderId) => {
        const folder = await Folder.findById(folderId);
        if (folder) {
            if (folder.topics.includes(topicId)) {
                return { folderId, success: false, error: 'Topic already exists in this folder' };
            }
            // Thêm topic vào thư mục
            folder.topics.push(topicId);
            await folder.save();
            return { folderId, success: true };
        } else {
            return { folderId, success: false, error: 'Folder not found' };
        }
    });

    const results = await Promise.all(promises);

    return res.status(200).json({
        success: true,
        results
    });
});

const removeTopicFromFolders = asyncHandler(async (req, res) => {
    const { topicId } = req.params;
    const { folderIds } = req.body;

    // Kiểm tra xem topicId và folderIds có được cung cấp không
    if (!topicId || !folderIds || !Array.isArray(folderIds) || folderIds.length === 0) {
        return res.status(400).json({ success: false, error: 'Missing topicId or folderIds' });
    }

    // Tìm chủ đề bằng topicId
    const topic = await Topic.findById(topicId);

    // Kiểm tra xem chủ đề có tồn tại không
    if (!topic) {
        return res.status(404).json({ success: false, error: 'Topic not found' });
    }

    // Xóa chủ đề khỏi mỗi thư mục trong folderIds
    const promises = folderIds.map(async (folderId) => {
        const folder = await Folder.findById(folderId);
        if (folder) {
            // Kiểm tra xem chủ đề có tồn tại trong thư mục không
            const topicIndex = folder.topics.indexOf(topicId);
            if (topicIndex !== -1) {
                folder.topics.splice(topicIndex, 1);
                await folder.save();
            }
            return { folderId, success: true };
        } else {
            return { folderId, success: false, error: 'Folder not found' };
        }
    });

    const results = await Promise.all(promises);

    return res.status(200).json({ success: true, results });
});

const updateTopicStar = asyncHandler(async (req, res) => {
    const { topicId } = req.params;
    const { termId, star } = req.body;

    try {
        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.status(404).json({ success: false, error: 'Topic not found' });
        }

        const term = topic.terms.id(termId);
        if (!term) {
            return res.status(404).json({ success: false, error: 'Term not found' });
        }

        term.star = star;
        await topic.save();

        return res.status(200).json({ success: true, updatedTerm: term });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = {
    createTopic,
    getTopicById,
    getAllTopic,
    updateTopic,
    deleteTopic,
    getTopicsByUserId,
    updateTopicMode,
    addTopicToFolders,
    removeTopicFromFolders,
    getAllPublicTopic,
    updateTopicStar
};