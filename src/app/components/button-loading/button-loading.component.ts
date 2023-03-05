import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-loading',
  templateUrl: './button-loading.component.html',
  styleUrls: ['./button-loading.component.scss'],
})
export class ButtonLoadingComponent {
  @Input() isLoading = false;
  @Input() isDisabled = false;
  @Input() btnType = 'primary';
  @Input() submit?: boolean = true;
}
