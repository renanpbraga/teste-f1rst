import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AppService } from 'src/app/app.service';
import { NotifyType } from 'src/app/components/notify/enums/notify-type.enum';
import { NotifyService } from 'src/app/components/notify/notify.service';
import { VehicleCategoryEnum } from 'src/app/utils/enums/vehicle-category.enum';
import { DocumentTypeEnum } from 'src/app/utils/enums/vehicle-category.enum copy';
import { VehicleSellerEnum } from 'src/app/utils/enums/vehicle-seller.enum';
import { YesNoEnum } from 'src/app/utils/enums/yes-no.enum';
import { ISelectVehicleCategory } from 'src/app/utils/interfaces/select-vehicle-category.interface';
import { ISelectVehicleSeller } from 'src/app/utils/interfaces/select-vehicle-seller.interface';
import { ISelectYesNo } from 'src/app/utils/interfaces/select-yes-no.interface';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@Component({
  selector: 'app-vehicle-financing-step-one',
  templateUrl: './vehicle-financing-step-one.component.html',
  styleUrls: ['./vehicle-financing-step-one.component.scss'],
})
export class VehicleFinancingStepOneComponent implements OnInit {
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
    vehicleType: ['', [Validators.required]],
    vehicleSeller: ['', [Validators.required]],
    vehicleSellerName: ['', [Validators.required]],
    vehicleSellerDocumentType: ['', [Validators.required]],
    vehicleSellerDocumentNumber: ['', [Validators.required]],
    vehicleSellerZipcode: ['', [Validators.required]],
    vehicleSellerAddress: [
      { value: '', disabled: true },
      [Validators.required],
    ],
    vehicleSellerAddressNumber: ['', [Validators.required]],
    vehicleSellerDistrict: [
      { value: '', disabled: true },
      [Validators.required],
    ],
    vehicleSellerCity: [{ value: '', disabled: true }, [Validators.required]],
    vehicleSellerState: [{ value: '', disabled: true }, [Validators.required]],
    vehicleBrand: ['', [Validators.required]],
    vehicleModel: ['', [Validators.required]],
    vehicleManufactureYear: ['', [Validators.required]],
    vehicleAveragePrice: [{ value: 0, disabled: true }, [Validators.required]],
    desiredFinancingValue: [
      { value: 0, disabled: true },
      [Validators.required],
    ],
    financialSupport: [0],
    dueDate: ['', Validators.required],
    instalmentsNumber: [0, Validators.required],
    acceptanceTerms: [false],
  });

  constructor(
    private formBuilder: FormBuilder,
    private readonly notifyService: NotifyService,
    private readonly appService: AppService
  ) {}

  ngOnInit() {}

  handleVehicleType(event: any) {
    this.vehicleBrandsList = [];
    this.vehicleModelsList = [];
    this.vehicleManufactureYearList = [];
    this.formData.controls.desiredFinancingValue.setValue(0);
    this.formData.controls.vehicleAveragePrice.setValue(0);
    this.formData.controls.financialSupport.setValue(0);
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
    this.formData.controls.vehicleAveragePrice.setValue(0);
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
    this.formData.controls.vehicleAveragePrice.setValue(0);
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
    this.formData.controls.vehicleAveragePrice.setValue(0);
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
            let averagePrice = res.Valor.replace('R$ ', '');
            averagePrice = averagePrice.replace('.', '');
            averagePrice = averagePrice.replace(',', '');
            averagePrice = averagePrice.substring(0, averagePrice.length - 2);
            console.log(averagePrice);

            this.formData.controls.vehicleAveragePrice.setValue(averagePrice);
            this.formData.controls.desiredFinancingValue.setValue(averagePrice);
            this.isLoadingVehicleAveragePrice = false;
          },
          error: (err) => {
            this.isLoadingVehicleAveragePrice = true;
          },
        });
    }
  }

  handleFinancingValue() {
    const averageValue = Number(
      this.formData.controls.vehicleAveragePrice.value
    );
    const supportValue = Number(this.formData.controls.financialSupport.value);
    if (averageValue && supportValue) {
      const financingValue = averageValue - supportValue;
      if (financingValue > 0) {
        this.formData.controls.desiredFinancingValue.setValue(financingValue);
      } else {
        this.formData.controls.desiredFinancingValue.setValue(0);
      }
    } else {
      this.formData.controls.desiredFinancingValue.setValue(averageValue);
    }
  }

  submit() {
    this.isSubmitted = true;
    this.isLoading = true;
    this.documentValidations();
    this.formCustomValidations();
    if (this.formData.invalid) {
      this.notifyService.sendMessage({
        message: 'Existem campos inválidos',
        type: NotifyType.error,
      });
      this.isLoading = false;
      return;
    }
    const data = this.formData.getRawValue();
    data.vehicleAveragePrice = Number(data.vehicleAveragePrice);
    data.desiredFinancingValue = Number(data.desiredFinancingValue);
    data.instalmentsNumber = Number(data.instalmentsNumber);
    
    localStorage.setItem('mocked-car-financing', JSON.stringify(data));
    this.stepEmitter.emit(2);
  }

  documentValidations() {
    const documentNumber = this.formData.controls.vehicleSellerDocumentNumber.value;
    const documentType = this.formData.controls.vehicleSellerDocumentType.value;
    if (documentType === 'CPF' && documentNumber) {
      const isCpfValid = cpf.isValid(documentNumber);
      if (!isCpfValid) {
        this.formData.controls.vehicleSellerDocumentNumber.setErrors({
          incorrect: true,
        });
        this.notifyService.sendMessage({
          message:
            'Este CPF não é válido',
          type: NotifyType.error,
        });
        this.isLoading = false;
        return;
      }
    }

    if (documentType === 'CNPJ' && documentNumber) {
      const isCnpjValid = cnpj.isValid(documentNumber);
      if (!isCnpjValid) {
        this.formData.controls.vehicleSellerDocumentNumber.setErrors({
          incorrect: true,
        });
        this.notifyService.sendMessage({
          message:
            'Este CNPJ não é válido',
          type: NotifyType.error,
        });
        this.isLoading = false;
        return;
      }
    }
  }

  formCustomValidations() {
    const financingValue = Number(
      this.formData.controls.desiredFinancingValue.value
    );
    const averagePrice = Number(
      this.formData.controls.vehicleAveragePrice.value
    );
    const financialSupport = Number(
      this.formData.controls.financialSupport.value
    );

    const financingValueMinusSupport = financingValue - financialSupport;

    if (financingValue && averagePrice) {
      if (financingValue > averagePrice) {
        this.formData.controls.desiredFinancingValue.setErrors({
          incorrect: true,
        });
        this.notifyService.sendMessage({
          message:
            'O valor do financiamento não pode ser maior que o valor médio do veículo',
          type: NotifyType.error,
        });
        this.isLoading = false;
        return;
      }
      if (financingValue < 10000) {
        this.formData.controls.desiredFinancingValue.setErrors({
          incorrect: true,
        });
        this.notifyService.sendMessage({
          message: 'O valor do financiamento deve ser de no mínimo R$10.000,00',
          type: NotifyType.error,
        });
        this.isLoading = false;
        return;
      }
    }

    if (financialSupport && averagePrice) {
      if (financialSupport >= averagePrice) {
        this.formData.controls.financialSupport.setErrors({
          incorrect: true,
        });
        this.notifyService.sendMessage({
          message:
            'O valor da entrada não pode ser maior ou igual que o valor médio do veículo',
          type: NotifyType.error,
        });
        this.isLoading = false;
        return;
      }
    }

    if (financingValueMinusSupport > 0 && financingValueMinusSupport < 1000) {
      this.formData.controls.desiredFinancingValue.setErrors({
        incorrect: true,
      });
      this.notifyService.sendMessage({
        message: 'O valor do financiamento deve ser superior a R$10.000,00',
        type: NotifyType.error,
      });
      this.isLoading = false;
      return;
    }
  }

  onDateChange(event: any) {
    this.startDate = event;
    const isoString = moment(event).toISOString().toString();
    this.formData.controls.dueDate.setValue(isoString);
  }

  get f(): any {
    return this.formData.controls;
  }

  getInstalmentsValue(instalment: number) {
    const calc =
      Number(this.formData.controls.desiredFinancingValue.value) / instalment;
    return Number(Math.round(Number(calc) * 100) / 100).toFixed(2);
  }
}
