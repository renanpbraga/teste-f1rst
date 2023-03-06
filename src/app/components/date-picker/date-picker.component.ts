import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  @Input() title?: string;
  @Input() date?: Date;
  @Input() isValid?: boolean;
  @Input() isNotValid?: boolean;
  @Input() isDisabled = false;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;

  @Output() action = new EventEmitter<Date>();

  isOpen = false;

  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-red',
    showWeekNumbers: false,
    dateInputFormat: 'DD/MM/YYYY',
    adaptivePosition: true,
    minDate: this.minDate,
    maxDate: this.maxDate,
  };

  constructor(private localeService: BsLocaleService) {
    this.localeService.use('pt-br');
  }

  changeDate(date: Date) {
    this.action.next(date);
  }

  toggle() {
    if (!this.isDisabled) {
      this.isOpen = !this.isOpen;
    }
  }
}
