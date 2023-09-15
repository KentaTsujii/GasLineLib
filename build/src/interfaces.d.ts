export interface ILineWebhookBody {
    destination: string;
    events: ILineEvent[];
}
export interface ILineEvent {
    type: string;
    mode: string;
    timestamp: number;
    source: ISource;
    webhookEventId: string;
    deliveryContext: IdeliveryContext;
}
export interface ISource {
    type: string;
    userId: string;
}
export interface IGroupSource {
    groupId: string;
}
export interface IdeliveryContext {
    isRedelivery: boolean;
}
export interface ILineMessageEvent extends ILineEvent {
    replyToken: string;
    message: ILineMessage;
}
export interface ILineMessage {
    id: string;
    type: string;
}
export interface ILineTextMessage extends ILineMessage {
    text: string;
}
export interface ILineUnsendEvent extends ILineEvent {
    unsend: IUnsend;
}
export interface IUnsend {
    messageId: string;
}
export interface ILineFollowEvent extends ILineEvent {
    replayToke: string;
}
export interface ILineJoinEvent extends ILineEvent {
    replayToke: string;
}
export interface ILineGroupJoinEvent extends ILineJoinEvent {
    joined: IMember;
}
export interface ILineGroupLeftEvent extends ILineEvent {
    left: IMember;
}
export interface IMember {
    members: ISource[];
}
export interface ILineUnFollowEvent extends ILineEvent {
}
export interface ILineLeaveEvent extends ILineEvent {
}
export declare const isLineWebhookMessage: (item: any) => item is ILineWebhookBody;
export declare const isLineEvent: (item: any) => item is ILineEvent;
export declare const isLineMessageEvent: (item: any) => item is ILineMessageEvent;
export declare const isLineFollowEvent: (item: any) => item is ILineFollowEvent;
export declare const isLineUnFollowEvent: (item: any) => item is ILineUnFollowEvent;
export declare const isLineLeaveEvent: (item: any) => item is ILineLeaveEvent;
export declare const isLineJoinEvent: (item: any) => item is ILineJoinEvent;
export declare const isLineGroupJoinEvent: (item: any) => item is ILineGroupJoinEvent;
export declare const isLineGroupLeftEvent: (item: any) => item is ILineGroupLeftEvent;
export declare const isLineTextMessage: (item: any) => item is ILineTextMessage;
//# sourceMappingURL=interfaces.d.ts.map