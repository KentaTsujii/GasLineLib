/// <reference types="google-apps-script" />
import { ILineEvent, ILineWebhookBody, ILineMessageEvent, ILineMessage, ISource, IdeliveryContext } from "./interfaces";
export * from "./interfaces";
/**
 * LINEのwebhookのbodyです。
 */
export declare class LineWebhookBody implements ILineWebhookBody {
    destination: string;
    events: ILineEvent[];
    constructor(obj: any);
    private get_events_from_obj;
    get_message_events(): LineMessage[];
}
/**
 * テキストメッセージクラス
 */
export declare class LineMessage implements ILineMessageEvent {
    replyToken: string;
    message: ILineMessage;
    type: string;
    mode: string;
    timestamp: number;
    source: ISource;
    webhookEventId: string;
    deliveryContext: IdeliveryContext;
    constructor(param: ILineMessageEvent);
    /**
     * メッセージに返信します
     * @param channel_access_token
     * @param message
     * @returns
     */
    reply(channel_access_token: string, message: string): GoogleAppsScript.URL_Fetch.HTTPResponse;
}
/**
 * webhookbodyを解析してLineWebhookBodyオブジェクトを生成します
 * @param obj
 * @returns
 */
export declare function analyze_webhook_body(obj: any): LineWebhookBody;
//# sourceMappingURL=index.d.ts.map