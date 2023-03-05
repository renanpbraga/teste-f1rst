import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NotifyService } from 'src/app/components/notify/notify.service';
import { FinancingCarStepOne } from 'src/app/utils/dto/finaicing-car-step-one.dto';
import { VehicleCategoryEnum } from 'src/app/utils/enums/vehicle-category.enum';

@Component({
  selector: 'app-car-financing-step-two',
  templateUrl: './car-financing-step-two.component.html',
  styleUrls: ['./car-financing-step-two.component.scss'],
})
export class CarFinancingStepTwoComponent implements OnInit {
  @Output() stepEmitter = new EventEmitter<number>();
  isSubmitted = false;
  stepOneData?: FinancingCarStepOne;
  vehicleCategoryEnum = VehicleCategoryEnum;
  currentDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private readonly notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    const mockCarStepOne = localStorage.getItem('mock-car-step-1');
    if (mockCarStepOne) {
      this.stepOneData = JSON.parse(mockCarStepOne);
    }
  }

  submit() {}

  getVehicleCategory(category: VehicleCategoryEnum) {
    let vehicleCategory;
    switch (category) {
      case VehicleCategoryEnum.COMMON:
        vehicleCategory = 'Passeio, Utilitário, Caminhonete, Jipe';
        break;
      case VehicleCategoryEnum.MOTOCYCLE:
        vehicleCategory = 'Motocicletas e Triciclos';
        break;
      case VehicleCategoryEnum.TRUCK:
        vehicleCategory = 'Caminhões, Reboques, Semi-reboques';
        break;
      case VehicleCategoryEnum.OTHER:
        vehicleCategory = 'Demais veículos (Ônibus, Microônibus)';
        break;
      default:
        break;
    }
    return vehicleCategory;
  }

  onDateChange(event: any) {
    this.currentDate = event;
  }
}
