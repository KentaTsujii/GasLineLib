"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyze_webhook_body = exports.LineMessage = exports.LineWebhookBody = void 0;
var interfaces_1 = require("./interfaces");
__exportStar(require("./interfaces"), exports);
/**
 * LINEのwebhookのbodyです。
 */
var LineWebhookBody = /** @class */ (function () {
    function LineWebhookBody(obj) {
        if ((0, interfaces_1.isLineWebhookMessage)(obj)) {
            this.destination = obj.destination;
            this.events = this.get_events_from_obj(obj.events);
        }
        else {
            throw "webhookMessageではありません。";
        }
    }
    LineWebhookBody.prototype.get_events_from_obj = function (events) {
        var ret = [];
        for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var e = events_1[_i];
            var target_event = void 0;
            if ((0, interfaces_1.isLineEvent)(e)) {
                target_event = e;
            }
            else {
                continue;
            }
            if (target_event.mode !== 'active')
                continue;
            if ((0, interfaces_1.isLineMessageEvent)(e)) {
                ret.push(new LineMessage(e));
            }
            else if ((0, interfaces_1.isLineFollowEvent)(e)) {
                ret.push(target_event);
            }
            else if ((0, interfaces_1.isLineUnFollowEvent)(e)) {
                ret.push(target_event);
            }
            else if ((0, interfaces_1.isLineGroupJoinEvent)(e)) {
                ret.push(target_event);
            }
            else if ((0, interfaces_1.isLineGroupLeftEvent)(e)) {
                ret.push(target_event);
            }
            else if ((0, interfaces_1.isLineJoinEvent)(e)) {
                ret.push(target_event);
            }
            else if ((0, interfaces_1.isLineLeaveEvent)(e)) {
                ret.push(target_event);
            }
        }
        return ret;
    };
    LineWebhookBody.prototype.get_message_events = function () {
        var ret = [];
        for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
            var e = _a[_i];
            if ((0, interfaces_1.isLineMessageEvent)(e)) {
                ret.push(new LineMessage(e));
            }
        }
        return ret;
    };
    return LineWebhookBody;
}());
exports.LineWebhookBody = LineWebhookBody;
var REPLAY_URL = 'https://api.line.me/v2/bot/message/reply';
/**
 * テキストメッセージクラス
 */
var LineMessage = /** @class */ (function () {
    function LineMessage(param) {
        this.replyToken = param.replyToken;
        this.message = param.message;
        this.type = param.type;
        this.mode = param.mode;
        this.timestamp = param.timestamp;
        this.source = param.source;
        this.webhookEventId = param.webhookEventId;
        this.deliveryContext = param.deliveryContext;
    }
    /**
     * メッセージに返信します
     * @param channel_access_token
     * @param message
     * @returns
     */
    LineMessage.prototype.reply = function (channel_access_token, message) {
        var formData = {
            replyToken: this.replyToken,
            messages: [
                {
                    type: "text",
                    text: message
                }
            ]
        };
        var header = {
            'Authorization': "Bearer ".concat(channel_access_token),
            'Content-Type': 'application/json',
        };
        var options = {
            headers: header,
            method: 'post',
            payload: JSON.stringify(formData)
        };
        return UrlFetchApp.fetch(REPLAY_URL, options);
    };
    return LineMessage;
}());
exports.LineMessage = LineMessage;
/**
 * webhookbodyを解析してLineWebhookBodyオブジェクトを生成します
 * @param obj
 * @returns
 */
function analyze_webhook_body(obj) {
    return new LineWebhookBody(obj);
}
exports.analyze_webhook_body = analyze_webhook_body;
//# sourceMappingURL=index.js.map