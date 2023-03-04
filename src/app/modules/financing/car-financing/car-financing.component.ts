import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { VehicleCategoryEnum } from 'src/app/utils/enums/vehicle-category.enum';
import { YesNoEnum } from 'src/app/utils/enums/yes-no.enum';
import { ISelectVehicleCategory } from 'src/app/utils/interfaces/select-vehicle-category.interface';
import { ISelectYesNo } from 'src/app/utils/interfaces/select-yes-no.interface';

@Component({
  selector: 'app-car-financing',
  templateUrl: './car-financing.component.html',
  styleUrls: ['./car-financing.component.scss'],
})
export class CarFinancingComponent {
  constructor(private formBuilder: FormBuilder) {}
  isSubmitted = false;
  isZeroKmOptions: ISelectYesNo[] = [
    {
      title: 'Sim',
      value: YesNoEnum.YES,
    },
    {
      title: 'Não',
      value: YesNoEnum.NO,
    },
  ];

  vehicleCategoryOptions: ISelectVehicleCategory[] = [
    {
      title: 'Passeio, Utilitário, Caminhonete, Jipe',
      value: VehicleCategoryEnum.COMMON,
    },
    {
      title: 'Caminhões, Reboques, Semi-reboques',
      value: VehicleCategoryEnum.TRUCK,
    },
    {
      title: 'Motocicletas e Triciclos',
      value: VehicleCategoryEnum.MOTOCYCLE,
    },
    {
      title: 'Demais veículos (Ônibus, Microônibus)',
      value: VehicleCategoryEnum.OTHER,
    },
  ];

  formData = this.formBuilder.group({
    vehicleYear: [null, [Validators.required, Validators.minLength(4)]],
    vehicleModelYear: [null, [Validators.required, Validators.minLength(4)]],
    isZeroKm: [null, [Validators.required]],
    vehicleCategory: [null, [Validators.required]],
    vehicleValue: [null, [Validators.required]],
    financingValue: [null, [Validators.required]],
  });

  submit() {
    this.isSubmitted = true;
    const data = this.formData.getRawValue();
    console.log('entrei');
    if (data.vehicleYear && Number(moment().year()) - data.vehicleYear >= 10) {
      this.formData.controls.vehicleYear.setErrors({
        incorrect: true,
      });
    }
    if (
      data.vehicleModelYear &&
      data.vehicleYear &&
      data.vehicleModelYear > data.vehicleYear
    ) {
      this.formData.controls.vehicleModelYear.setErrors({
        incorrect: true,
      });
    }

    if (data.vehicleValue && data.financingValue && (data.financingValue > data.vehicleValue)) {
      this.formData.controls.financingValue.setErrors({
        incorrect: true,
      });
    }
  }

  get f(): any {
    return this.formData.controls;
  }
}
