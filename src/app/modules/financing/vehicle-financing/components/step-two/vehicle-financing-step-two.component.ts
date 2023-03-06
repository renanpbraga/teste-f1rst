import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { NotifyService } from 'src/app/components/notify/notify.service';
import { VehicleCategoryEnum } from 'src/app/utils/enums/vehicle-category.enum';
import { FinancingInput } from 'src/app/utils/inputs/vehicle-financing.input';

@Component({
  selector: 'app-vehicle-financing-step-two',
  templateUrl: './vehicle-financing-step-two.component.html',
  styleUrls: ['./vehicle-financing-step-two.component.scss'],
})
export class VehicleFinancingStepTwoComponent implements OnInit {
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
