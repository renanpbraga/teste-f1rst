import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AppService } from 'src/app/app.service';
import { NotifyService } from 'src/app/components/notify/notify.service';
import { VehicleCategoryEnum } from 'src/app/utils/enums/vehicle-category.enum';
import { DocumentTypeEnum } from 'src/app/utils/enums/vehicle-category.enum copy';
import { VehicleSellerEnum } from 'src/app/utils/enums/vehicle-seller.enum';
import { YesNoEnum } from 'src/app/utils/enums/yes-no.enum';
import { ISelectVehicleCategory } from 'src/app/utils/interfaces/select-vehicle-category.interface';
import { ISelectVehicleSeller } from 'src/app/utils/interfaces/select-vehicle-seller.interface';
import { ISelectYesNo } from 'src/app/utils/interfaces/select-yes-no.interface';

@Component({
  selector: 'app-car-financing-step-one',
  templateUrl: './car-financing-step-one.component.html',
  styleUrls: ['./car-financing-step-one.component.scss'],
})
export class CarFinancingStepOneComponent implements OnInit {
  @Output() stepEmitter = new EventEmitter<number>();
  isSubmitted = false;
  isLoading = false;
  isLoadingVehicleBrands = false;
  isLoadingVehicleModels = false;
  isLoadingVehicleManufactureYears = false;
  isLoadingVehicleAveragePrice = false;
  startDate = moment().add(1, 'month').toDate();
  minDate = this.startDate;
  maxDate = moment(this.startDate).add(1, 'month').toDate();
  vehicleBrandsList: any[] = [];
  vehicleModelsList: any[] = [];
  vehicleManufactureYearList: any[] = [];
  vehicleTypes: ISelectVehicleCategory[] = [
    {
      title: 'Carro',
      value: VehicleCategoryEnum.CAR,
    },
    {
      title: 'Moto',
      value: VehicleCategoryEnum.MOTORCYCLE,
    },
  ];

  vehicleSellerList: ISelectVehicleSeller[] = [
    {
      title: 'Loja ou concessionária',
      value: VehicleSellerEnum.DEALER,
    },
    {
      title: 'Pessoa física',
      value: VehicleSellerEnum.PERSON,
    },
  ];

  vehicleCategoryOptions: ISelectVehicleCategory[] = [
    {
      title: 'Carro',
      value: VehicleCategoryEnum.CAR,
    },
    {
      title: 'Moto',
      value: VehicleCategoryEnum.MOTORCYCLE,
    },
  ];

  formData = this.formBuilder.group({
    vehicleType: [''],
    vehicleSeller: [''],
    vehicleSellerName: [''],
    vehicleSellerDocumentType: [''],
    vehicleSellerDocumentNumber: [''],
    vehicleSellerZipcode: [''],
    vehicleSellerAddress: [{ value: '', disabled: true }],
    vehicleSellerAddressNumber: [''],
    vehicleSellerDistrict: [{ value: '', disabled: true }],
    vehicleSellerCity: [{ value: '', disabled: true }],
    vehicleSellerState: [{ value: '', disabled: true }],
    vehicleBrand: [''],
    vehicleModel: [''],
    vehicleManufactureYear: [''],
    vehicleAveragePrice: [{ value: '', disabled: true }],
  });

  constructor(
    private formBuilder: FormBuilder,
    private readonly notifyService: NotifyService,
    private readonly appService: AppService
  ) {}

  ngOnInit() {}

  handleVehicleType(event: any) {
    this.formData.controls.vehicleType.setValue(event.target.value);
  }

  handleVehicleSeller(event: any) {
    this.formData.controls.vehicleSeller.setValue(event.target.value);
    switch (event.target.value) {
      case 'DEALER':
        this.formData.controls['vehicleSellerDocumentType'].setValue(
          DocumentTypeEnum.CNPJ
        );
        break;
      case 'PERSON':
        this.formData.controls['vehicleSellerDocumentType'].setValue(
          DocumentTypeEnum.CPF
        );
        break;
      default:
        break;
    }
    this.formData.controls.vehicleSeller.setValue(event.target.value);
  }

  autoCompleteAddress(event: any) {
    const zipcode = event.target.value.replace('-', '');

    if (zipcode.length === 8) {
      this.appService.getAddress(zipcode).subscribe({
        next: (res: any) => {
          this.formData.controls.vehicleSellerDistrict.setValue(res.bairro);
          this.formData.controls.vehicleSellerCity.setValue(res.localidade);
          this.formData.controls.vehicleSellerAddress.setValue(res.logradouro);
          this.formData.controls.vehicleSellerState.setValue(res.uf);
          this.getVehicleBrandsList();
        },
      });
    }
  }

  getVehicleBrandsList() {
    this.vehicleModelsList = [];
    this.vehicleManufactureYearList = [];
    this.formData.controls.vehicleAveragePrice.setValue('');
    const vehicleType = this.formData.controls.vehicleType.value;
    if (vehicleType) {
      this.isLoadingVehicleBrands = true;
      this.appService.getVehicleBrands(vehicleType).subscribe({
        next: (res: any) => {
          this.vehicleBrandsList = res;
          this.isLoadingVehicleBrands = false;
        },
        error: (err) => {
          this.isLoadingVehicleBrands = true;
          throw new Error(err);
        },
      });
    }
  }

  getVehicleModels() {
    this.vehicleManufactureYearList = [];
    this.formData.controls.vehicleAveragePrice.setValue('');
    const vehicleType = this.formData.controls.vehicleType.value;
    const brandCode = this.formData.controls.vehicleBrand.value;
    if (vehicleType && brandCode) {
      this.isLoadingVehicleModels = true;
      this.appService.getVehicleModels(vehicleType, brandCode).subscribe({
        next: (res: any) => {
          this.vehicleModelsList = res.modelos;
          this.isLoadingVehicleModels = false;
        },
        error: (err) => {
          this.isLoadingVehicleModels = false;
          throw new Error(err);
        },
      });
    }
  }

  getVehicleManufactureYears() {
    this.formData.controls.vehicleAveragePrice.setValue('');
    const vehicleType = this.formData.controls.vehicleType.value;
    const brandCode = this.formData.controls.vehicleBrand.value;
    const modelCode = this.formData.controls.vehicleModel.value;

    if (vehicleType && brandCode && modelCode) {
      this.isLoadingVehicleManufactureYears = true;
      this.appService
        .getVehicleManufactureYears(vehicleType, brandCode, modelCode)
        .subscribe({
          next: (res: any) => {
            this.vehicleManufactureYearList = res;
            this.isLoadingVehicleManufactureYears = false;
          },
          error: (err) => {
            this.isLoadingVehicleManufactureYears = false;
            throw new Error(err);
          },
        });
    }
  }

  getVehicleAveragePrice() {
    const vehicleType = this.formData.controls.vehicleType.value;
    const brandCode = this.formData.controls.vehicleBrand.value;
    const modelCode = this.formData.controls.vehicleModel.value;
    const yearCode = this.formData.controls.vehicleManufactureYear.value;
    if (vehicleType && brandCode && modelCode && yearCode) {
      this.isLoadingVehicleAveragePrice = true;
      this.appService
        .getVehicleAveragePrice(vehicleType, brandCode, modelCode, yearCode)
        .subscribe({
          next: (res: any) => {
            this.formData.controls.vehicleAveragePrice.setValue(res.Valor);
            this.isLoadingVehicleAveragePrice = false;
          },
          error: (err) => {
            this.isLoadingVehicleAveragePrice = true;
          }
        });
    }
  }

  submit() {
    this.isSubmitted = true;
    const data = this.formData.getRawValue();
    console.log(data);
  }

  // formValidations(data: any) {
  //   if (data.vehicleYear && Number(moment().year()) - data.vehicleYear >= 10) {
  //     this.notifyService.sendMessage({
  //       message:
  //         'Não é possível financiar veículos com mais de 10 anos de fabricação.',
  //       type: NotifyType.error,
  //     });
  //     this.formData.controls.vehicleYear.setErrors({
  //       incorrect: true,
  //     });
  //     return;
  //   }
  //   if (data.vehicleModelYear && data.vehicleYear) {
  //     if (data.vehicleModelYear < data.vehicleYear) {
  //       this.notifyService.sendMessage({
  //         message:
  //           'A data de fabricação não pode ser maior que o ano do modelo.',
  //         type: NotifyType.error,
  //       });
  //       this.formData.controls.vehicleModelYear.setErrors({
  //         incorrect: true,
  //       });
  //       return;
  //     }
  //   }

  //   if (data.vehicleValue && data.financingValue) {
  //     if (data.financingValue > data.vehicleValue) {
  //       this.notifyService.sendMessage({
  //         message:
  //           'O valor do financiamento não pode ser maior que o valor do veículo.',
  //         type: NotifyType.error,
  //       });
  //       this.formData.controls.financingValue.setErrors({
  //         incorrect: true,
  //       });
  //       return;
  //     }

  //     if (data.vehicleValue < 10000) {
  //       this.notifyService.sendMessage({
  //         message: 'O valor do veículo não pode ser menor que R$10.000,00.',
  //         type: NotifyType.error,
  //       });
  //       this.formData.controls.vehicleValue.setErrors({
  //         incorrect: true,
  //       });
  //       return;
  //     }

  //     if (data.financingValue < 10000) {
  //       this.notifyService.sendMessage({
  //         message:
  //           'O valor do financiamento não pode ser menor que R$10.000,00.',
  //         type: NotifyType.error,
  //       });
  //       this.formData.controls.financingValue.setErrors({
  //         incorrect: true,
  //       });
  //       return;
  //     }
  //   }
  // }

  onDateChange(event: any) {
    this.startDate = event;
  }

  get f(): any {
    return this.formData.controls;
  }
}
