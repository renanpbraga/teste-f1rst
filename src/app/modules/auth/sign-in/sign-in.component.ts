import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { NotifyType } from 'src/app/components/notify/enums/notify-type.enum';
import { NotifyService } from 'src/app/components/notify/notify.service';
import { RegistryDto } from 'src/app/utils/dto/registry-dto';
import { UserDto } from 'src/app/utils/dto/user-dto';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  isSubmitted = false;
  isLoading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly appService: AppService,
    private readonly router: Router,
    private readonly notifyService: NotifyService
  ) {}

  formData = this.formBuilder.group({
    agency: [null, [Validators.required, Validators.minLength(5)]],
    account: [null, [Validators.required, Validators.minLength(5)]],
  });
  ngOnInit(): void {}

  submit() {
    this.isSubmitted = true;
    this.isLoading = true;
    const data = this.formData.getRawValue();
    this.appService.findUser().subscribe({
      next: (res: any) => {
        const users: UserDto[] = res;
        if (users.length) {
          const isUser = users.find(
            (user) =>
              user.agency === data.agency && user.account === data.account
          );
          if (isUser) {
            this.appService.findUser().subscribe({
              next: (res: any) => {
                const users: UserDto[] = res;
                const currentUser = users.find((user) => user.id === isUser.id);
                if (currentUser) {
                  this.appService.saveUserOnStorage(currentUser);
                }
                setTimeout(() => {
                  this.isLoading = false;
                  this.router.navigateByUrl('/');
                }, 1000);
              },
            });
          } else {
            this.notifyService.sendMessage({
              message:
                'Agência ou conta não encontrados. Verifique se os dados estão corretamente informados!',
              type: NotifyType.error,
            });
            this.isLoading = false;
          }
        } else {
          setTimeout(() => {
            this.router.navigateByUrl('/auth/sign-up');
          }, 1000);
        }
      },
      error: (err) => {
        this.notifyService.sendMessage({
          message:
            'Agência ou conta não encontrados. Verifique se os dados foram corretamente informados!',
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
