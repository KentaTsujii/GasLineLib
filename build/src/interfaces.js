"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLineTextMessage = exports.isLineGroupLeftEvent = exports.isLineGroupJoinEvent = exports.isLineJoinEvent = exports.isLineLeaveEvent = exports.isLineUnFollowEvent = exports.isLineFollowEvent = exports.isLineMessageEvent = exports.isLineEvent = exports.isLineWebhookMessage = void 0;
var isLineWebhookMessage = function (item) {
    return item.destination !== undefined && item.events !== undefined;
};
exports.isLineWebhookMessage = isLineWebhookMessage;
var isLineEvent = function (item) {
    return item.mode !== undefined &&
        item.timestamp !== undefined &&
        item.source !== undefined &&
        item.webhookEventId !== undefined &&
        item.deliveryContext !== undefined;
};
exports.isLineEvent = isLineEvent;
var isLineMessageEvent = function (item) {
    return item.type === 'message' &&
        item.replyToken !== undefined &&
        item.message !== undefined;
};
exports.isLineMessageEvent = isLineMessageEvent;
var isLineFollowEvent = function (item) {
    return item.type === 'follow' && item.replyToken !== undefined;
};
exports.isLineFollowEvent = isLineFollowEvent;
var isLineUnFollowEvent = function (item) {
    return item.type === 'unfollow';
};
exports.isLineUnFollowEvent = isLineUnFollowEvent;
var isLineLeaveEvent = function (item) {
    return item.type === 'leave';
};
exports.isLineLeaveEvent = isLineLeaveEvent;
var isLineJoinEvent = function (item) {
    return item.type === 'join';
};
exports.isLineJoinEvent = isLineJoinEvent;
var isLineGroupJoinEvent = function (item) {
    return item.type === 'memberJoined';
};
exports.isLineGroupJoinEvent = isLineGroupJoinEvent;
var isLineGroupLeftEvent = function (item) {
    return item.type === 'memberLeft';
};
exports.isLineGroupLeftEvent = isLineGroupLeftEvent;
var isLineTextMessage = function (item) {
    return item.type === 'text';
};
exports.isLineTextMessage = isLineTextMessage;
//# sourceMappingURL=interfaces.js.map