const Notification = require('../models/Notification.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

const getNotifications = asyncHandler(async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;
    const [notifications, total] = await Promise.all([
        Notification.find({ recipient: req.user._id }).sort('-createdAt').skip(skip).limit(limit).lean(),
        Notification.countDocuments({ recipient: req.user._id })
    ]);
    const meta = { page, limit, total, totalPages: Math.ceil(total / limit) };
    res.status(200).json(new ApiResponse(200, { data: notifications, meta }, 'Notifications fetched'));
});

const markAsRead = asyncHandler(async (req, res) => {
    const n = await Notification.findOneAndUpdate(
        { _id: req.params.id, recipient: req.user._id },
        { $set: { read: true } },
        { new: true }
    );
    if (!n) throw new ApiError(404, 'Notification not found');
    res.status(200).json(new ApiResponse(200, n, 'Marked as read'));
});

const markAllAsRead = asyncHandler(async (req, res) => {
    const r = await Notification.updateMany({ recipient: req.user._id, read: false }, { $set: { read: true } });
    res.status(200).json(new ApiResponse(200, { modifiedCount: r.modifiedCount }, 'All marked as read'));
});

const getUnreadCount = asyncHandler(async (req, res) => {
    const count = await Notification.countDocuments({ recipient: req.user._id, read: false });
    res.status(200).json(new ApiResponse(200, { unreadCount: count }, 'Unread count'));
});

module.exports = { getNotifications, markAsRead, markAllAsRead, getUnreadCount };
