const Topic = require('../models/topic');
const User = require('../models/user')
const Folder = require('../models/folder')
const asyncHandler = require('express-async-handler');

const createFolder = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing input');

    const newFolder = await Folder.create({ ...req.body });
    return res.status(200).json({
        success: newFolder ? true : false,
        createdFolder: newFolder ? newFolder : 'Cannot create new Folder'
    });
});

const getFolder = asyncHandler(async (req, res) => {
    const { folderId } = req.params;
    const folder = await Folder.findOne({ _id: folderId });
    return res.status(200).json({
        success: folder ? true : false,
        folderData: folder ? folder : 'Cannot get Folder'
    });
});

const getFoldersByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ success: false, error: 'Missing user id' });
    }

    const folders = await Folder.find({ user: userId });
    return res.status(200).json({
        success: folders ? true : false,
        folders: folders ? folders : 'Cannot get folders for this user'
    });
});

const getAllFolder = asyncHandler(async (req, res) => {
    const folder = await Folder.find();
    return res.status(200).json({
        success: folder ? true : false,
        folders: folder ? folder : 'Cannot get all Folder'
    });
});


const updateFolder = asyncHandler(async (req, res) => {
    const { folderId } = req.params;
    const updatedFolder = await Folder.findOneAndUpdate({ _id: folderId }, req.body, { new: true });
    return res.status(200).json({
        success: updatedFolder ? true : false,
        updatedFolder: updatedFolder ? updatedFolder : 'Cannot update Folder'
    });
});

const deleteFolder = asyncHandler(async (req, res) => {
    const { folderId } = req.params;

    try {
        const deletedFolder = await Folder.findOneAndDelete({ _id: folderId });

        return res.status(200).json({
            success: deletedFolder ? true : false,
            deletedFolder: deletedFolder ? deletedFolder : 'Cannot delete Folder'
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

const addTopicsToFolder = asyncHandler(async (req, res) => {
    const { folderId } = req.params;
    const { topics } = req.body;

    try {
        // Lấy danh sách topic đã tồn tại trong thư mục
        const existingFolder = await Folder.findById(folderId);
        const existingTopics = existingFolder.topics;

        // Lọc ra các topic mới mà chưa tồn tại trong thư mục
        const newTopics = topics.filter(topicId => !existingTopics.includes(topicId));

        // Thêm các topic mới vào thư mục
        const updatedFolder = await Folder.findOneAndUpdate(
            { _id: folderId },
            { $push: { topics: { $each: newTopics } } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            updatedFolder
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

const deleteTopicsFromFolder = asyncHandler(async (req, res) => {
    const { folderId } = req.params;
    const { topics } = req.body;

    try {
        // Lấy danh sách topic đã tồn tại trong thư mục
        const existingFolder = await Folder.findById(folderId);
        const existingTopics = existingFolder.topics;

        // Lọc ra các topic mới mà chưa tồn tại trong thư mục
        const topicsToDelete = topics.filter(topicId => existingTopics.includes(topicId));

        // Xóa các topic đã tồn tại trong thư mục
        const updatedFolder = await Folder.findOneAndUpdate(
            { _id: folderId },
            { $pull: { topics: { $in: topicsToDelete } } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            updatedFolder
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


module.exports = {
    createFolder,
    getFolder,
    getAllFolder,
    updateFolder,
    deleteFolder,
    getFoldersByUserId,
    addTopicsToFolder,
    deleteTopicsFromFolder
};