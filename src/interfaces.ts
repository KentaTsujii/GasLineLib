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

export interface IMember{
  members: ISource[];
}

export interface ILineUnFollowEvent extends ILineEvent {}
export interface ILineLeaveEvent extends ILineEvent {}


export const isLineWebhookMessage = (item: any): item is ILineWebhookBody => 
  item.destination !== undefined && item.events !== undefined;

export const isLineEvent = (item: any): item is ILineEvent =>
  item.mode !== undefined &&
  item.timestamp !== undefined &&
  item.source !== undefined &&
  item.webhookEventId !== undefined &&
  item.deliveryContext !== undefined;

export const isLineMessageEvent = (item: any): item is ILineMessageEvent => 
  item.type === 'message' && 
  item.replyToken !== undefined && 
  item.message !== undefined;

export const isLineFollowEvent = (item: any): item is ILineFollowEvent => 
  item.type === 'follow' && item.replyToken !== undefined;

export const isLineUnFollowEvent = (item: any): item is ILineUnFollowEvent => 
  item.type === 'unfollow';

export const isLineLeaveEvent = (item: any): item is ILineLeaveEvent => 
  item.type === 'leave';

export const isLineJoinEvent = (item: any): item is ILineJoinEvent => 
  item.type === 'join';

export const isLineGroupJoinEvent = (item: any): item is ILineGroupJoinEvent => 
  item.type === 'memberJoined';

export const isLineGroupLeftEvent = (item: any): item is ILineGroupLeftEvent => 
  item.type === 'memberLeft';

export const isLineTextMessage = (item: any): item is ILineTextMessage =>
  item.type === 'text'
