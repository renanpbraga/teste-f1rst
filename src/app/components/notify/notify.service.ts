import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { NotifyMessage } from "./dtos/notify-message.model";
import { ToastrService } from 'ngx-toastr';
import { NotifyType } from "./enums/notify-type.enum";

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private notifySubject: Subject<NotifyMessage> = new Subject<NotifyMessage>();

  sendMessage(message: NotifyMessage) {
    this.notifySubject.next(message);
  }

  constructor(private toastrService: ToastrService) {
    this.listenForMessages();
  }

  listenForMessages() {
    this.notifySubject.subscribe({
      next: (message) => {
        switch (message.type) {
          case NotifyType.success:
            this.toastrService.success(message.message);
            break;
          case NotifyType.error:
            this.toastrService.error(message.message);
            break;
          case NotifyType.warning:
            this.toastrService.warning(message.message);
            break;
          case NotifyType.info:
            this.toastrService.info(message.message);
            break;
          default:
          case NotifyType.info:
            this.toastrService.info(message.message);
            break;
        }
      },
      error: (err) => {
        console.error('Error when processing toastr message');
      },
    });
  }
}
