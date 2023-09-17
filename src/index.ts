import { ILineEvent, 
         isLineEvent,
         ILineWebhookBody, 
         isLineWebhookMessage,
         ILineMessageEvent,
         isLineMessageEvent,
         ILineMessage,
         ISource,
         IdeliveryContext,
         isLineFollowEvent,
         ILineFollowEvent,
         isLineUnFollowEvent,
         ILineJoinEvent,
         isLineJoinEvent,
         ILineLeaveEvent,
         isLineLeaveEvent,
         ILineGroupJoinEvent,
         isLineGroupJoinEvent,
         ILineGroupLeftEvent,
         isLineGroupLeftEvent,
         ILineUnFollowEvent} from "./interfaces";
export * from "./interfaces";

/**
 * LINEのwebhookのbodyです。
 */
export class LineWebhookBody implements ILineWebhookBody{
  destination: string;
  events: ILineEvent[];

  constructor(obj: any){
    if(isLineWebhookMessage(obj)){
      this.destination = obj.destination;
      this.events = this.get_events_from_obj(obj.events);
    }
    else{
      throw "webhookMessageではありません。"
    }
  }

  private get_events_from_obj(events: any[]): ILineEvent[] {
    let ret: ILineEvent[] = [];

    for(let e of events){
      let target_event: ILineEvent;
      if(isLineEvent(e)){
        target_event = <ILineEvent>e
      }else{
        continue;
      }  
      if(target_event.mode !== 'active') continue;

      if(isLineMessageEvent(e)){
        ret.push(new LineMessage(e));
      }
      else if(isLineFollowEvent(e)){
        ret.push(<ILineFollowEvent>target_event);
      }
      else if(isLineUnFollowEvent(e)){
        ret.push(<ILineUnFollowEvent>target_event);
      }
      else if (isLineGroupJoinEvent(e)){
        ret.push(<ILineGroupJoinEvent>target_event);
      }
      else if (isLineGroupLeftEvent(e)){
        ret.push(<ILineGroupLeftEvent>target_event);
      }
      else if (isLineJoinEvent(e)){
        ret.push(<ILineJoinEvent>target_event);
      }
      else if (isLineLeaveEvent(e)){
        ret.push(<ILineLeaveEvent>target_event);
      }
    }

    return ret;
  }

  get_message_events(): LineMessage[] {
    let ret: LineMessage[] = []

    for(let e of this.events){
      if(isLineMessageEvent(e)){
        ret.push(new LineMessage(e));
      }
    }

    return ret;
  }
}

const REPLAY_URL: string = 'https://api.line.me/v2/bot/message/reply';

/**
 * テキストメッセージクラス
 */
export class LineMessage implements ILineMessageEvent {

  replyToken: string;
  message: ILineMessage;
  type: string;
  mode: string;
  timestamp: number;
  source: ISource;
  webhookEventId: string;
  deliveryContext: IdeliveryContext;

  constructor(param: ILineMessageEvent){
    this.replyToken = param.replyToken;
    this.message = param.message ;
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
  reply(channel_access_token: string, message: string) {
    const formData = {
      replyToken: this.replyToken,
      messages: [
        {
          type: "text",
          text: message
        }
      ]
    };
    const header = {
      'Authorization': `Bearer ${channel_access_token}`,
      'Content-Type': 'application/json',
    }

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      headers: header,
      method: 'post',
      payload: JSON.stringify(formData)
    };
    return UrlFetchApp.fetch(REPLAY_URL, options);
  }
}

/**
 * webhookbodyを解析してLineWebhookBodyオブジェクトを生成します
 * @param obj 
 * @returns 
 */
export function analyze_webhook_body(obj: any){
  return new LineWebhookBody(obj);
}

export interface IUserInfo {
  displayName: string
  userId: string
  language: string
  pictureUrl: string
  statusMessage: string
}

export function get_user_info(channel_access_token: string, 
                              user_id: string): IUserInfo {
  const url = `https://api.line.me/v2/bot/profile/${user_id}`;
  const header = {
    'Authorization': `Bearer ${channel_access_token}`
  };
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    headers: header,
    method: 'get',
  };
  const ret = UrlFetchApp.fetch(url, options);
  return JSON.parse(ret.getContentText());
}
