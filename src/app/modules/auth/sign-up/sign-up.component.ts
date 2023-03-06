import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { NotifyType } from 'src/app/components/notify/enums/notify-type.enum';
import { NotifyService } from 'src/app/components/notify/notify.service';
import { RegistryDto } from 'src/app/utils/dto/registry-dto';
import { cpf } from 'cpf-cnpj-validator';
import { UserInput } from 'src/app/utils/inputs/user.input';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  isSubmitted = false;
  isLoading = false;
  signUpSuccess = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly appService: AppService,
    private readonly notifyService: NotifyService
  ) {}

  formData = this.formBuilder.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    phone: [
      null,
      [Validators.required, Validators.minLength(11), Validators.maxLength(11)],
    ],
    cpf: [null, [Validators.required]],
    zipcode: [null, [Validators.required]],
    address: [{ value: null, disabled: true }, [Validators.required]],
    addressNumber: [null, [Validators.required]],
    addressComplement: [null],
    district: [{ value: null, disabled: true }, [Validators.required]],
    city: [{ value: null, disabled: true }, [Validators.required]],
    state: [{ value: null, disabled: true }, [Validators.required]],
    agency: [null, [Validators.required, Validators.maxLength(5)]],
    account: [null, [Validators.required, Validators.maxLength(5)]],
  });

  ngOnInit(): void {}

  validateCpf(): boolean {
    const document = this.formData.controls.cpf.value;
    if (document) {
      return cpf.isValid(document);
    } else {
      return false;
    }
  }

  autoCompleteAddress(event: any) {
    const zipcode = event.target.value.replace('-', '');

    if (zipcode.length === 8) {
      this.appService.getAddress(zipcode).subscribe({
        next: (res: any) => {
          this.formData.controls['district'].setValue(res.bairro);
          this.formData.controls['city'].setValue(res.localidade);
          this.formData.controls['address'].setValue(res.logradouro);
          this.formData.controls['state'].setValue(res.uf);
        },
      });
    }
  }

  submit() {
    this.isSubmitted = true;
    this.isLoading = true;

    if (!this.validateCpf()) {
      this.formData.controls.cpf.setErrors({
        incorrect: true,
      });
      this.isLoading = false;
      return;
    }
    const userInput = this.formData.getRawValue();
    this.appService.preRegisterUser(userInput).subscribe({
      next: (res) => {
        this.signUpSuccess = true;
        this.isLoading = false;
      },
      error: (err) => {
        this.notifyService.sendMessage({
          message:
            'Ocorreu um erro durante seu cadastro. Tente novamente ou entre em contato com a central de suporte.',
          type: NotifyType.error,
        });
        this.isLoading = false;
        throw new Error(err);
      },
    });
  }

  get f(): any {
    return this.formData.controls;
  }
}
