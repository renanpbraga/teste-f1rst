import { NotifyType } from '../enums/notify-type.enum';

export interface NotifyMessage {
  message?: string;
  type?: NotifyType;
}
