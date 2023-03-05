import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NotifyType } from 'src/app/components/notify/enums/notify-type.enum';
import { NotifyService } from 'src/app/components/notify/notify.service';
import { VehicleCategoryEnum } from 'src/app/utils/enums/vehicle-category.enum';
import { YesNoEnum } from 'src/app/utils/enums/yes-no.enum';
import { ISelectVehicleCategory } from 'src/app/utils/interfaces/select-vehicle-category.interface';
import { ISelectYesNo } from 'src/app/utils/interfaces/select-yes-no.interface';

@Component({
  selector: 'app-car-financing-step-one',
  templateUrl: './car-financing-step-one.component.html',
  styleUrls: ['./car-financing-step-one.component.scss'],
})
export class CarFinancingStepOneComponent {
  @Output() stepEmitter = new EventEmitter<number>();
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

  constructor(
    private formBuilder: FormBuilder,
    private readonly notifyService: NotifyService
  ) {}

  submit() {
    this.isSubmitted = true;
    const data = this.formData.getRawValue();
    this.formValidations(data);
    localStorage.setItem('mock-car-step-1', JSON.stringify(data));
    this.stepEmitter.emit(2);
  }

  formValidations(data: any) {
    if (data.vehicleYear && Number(moment().year()) - data.vehicleYear >= 10) {
      this.notifyService.sendMessage({
        message:
          'Não é possível financiar veículos com mais de 10 anos de fabricação.',
        type: NotifyType.error,
      });
      this.formData.controls.vehicleYear.setErrors({
        incorrect: true,
      });
      return;
    }
    if (data.vehicleModelYear && data.vehicleYear) {
      if (data.vehicleModelYear < data.vehicleYear) {
        this.notifyService.sendMessage({
          message:
            'A data de fabricação não pode ser maior que o ano do modelo.',
          type: NotifyType.error,
        });
        this.formData.controls.vehicleModelYear.setErrors({
          incorrect: true,
        });
        return;
      }
    }

    if (data.vehicleValue && data.financingValue) {
      if (data.financingValue > data.vehicleValue) {
        this.notifyService.sendMessage({
          message:
            'O valor do financiamento não pode ser maior que o valor do veículo.',
          type: NotifyType.error,
        });
        this.formData.controls.financingValue.setErrors({
          incorrect: true,
        });
        return;
      }

      if (data.vehicleValue < 10000) {
        this.notifyService.sendMessage({
          message: 'O valor do veículo não pode ser menor que R$10.000,00.',
          type: NotifyType.error,
        });
        this.formData.controls.vehicleValue.setErrors({
          incorrect: true,
        });
        return;
      }
      
      if (data.financingValue < 10000) {
        this.notifyService.sendMessage({
          message:
            'O valor do financiamento não pode ser menor que R$10.000,00.',
          type: NotifyType.error,
        });
        this.formData.controls.financingValue.setErrors({
          incorrect: true,
        });
        return;
      }
    }
  }

  get f(): any {
    return this.formData.controls;
  }
}
