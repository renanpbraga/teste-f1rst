import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AppService } from 'src/app/app.service';
import { NotifyService } from 'src/app/components/notify/notify.service';
import { FinancingCarStepOne } from 'src/app/utils/dto/finaicing-car-step-one.dto';
import { VehicleCategoryEnum } from 'src/app/utils/enums/vehicle-category.enum';
import { FinancingInput } from 'src/app/utils/inputs/vehicle-financing.input';

@Component({
  selector: 'app-vehicle-financing-step-three',
  templateUrl: './vehicle-financing-step-three.component.html',
  styleUrls: ['./vehicle-financing-step-three.component.scss'],
})
export class VehicleFinancingStepThreeComponent implements OnInit {
  @Output() stepEmitter = new EventEmitter<number>();
  @Input() step?: number;
  isSubmitted = false;
  stepOneData?: FinancingInput;
  vehicleCategoryEnum = VehicleCategoryEnum;
  acceptTerms = false;

  constructor(
    private formBuilder: FormBuilder,
    private readonly notifyService: NotifyService,
    private readonly appService: AppService,
  ) {}

  ngOnInit(): void {
    const mockCarStepOne = localStorage.getItem('mocked-car-financing');
    if (mockCarStepOne) {
      this.stepOneData = JSON.parse(mockCarStepOne);
    }
  }

  submit() {
    if (this.stepOneData && this.acceptTerms) {
      this.appService.registerFinancing(this.stepOneData).subscribe({
        next: (res) => {
          this.stepEmitter.emit(3);
        }
      });
    }
  }

  backStep() {
    if (this.step) {
      this.stepEmitter.emit(this.step - 1);
    }
  }

  handleAcceptTerms() {
    this.acceptTerms = !this.acceptTerms;
    if (this.stepOneData) {
      this.stepOneData.acceptanceTerms = this.acceptTerms;
    }
  }
}
