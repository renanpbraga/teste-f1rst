import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { UserDto } from 'src/app/utils/dto/user-dto';
import { NotifyType } from '../notify/enums/notify-type.enum';
import { NotifyService } from '../notify/notify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  search?: string;
  cpf?: string;
  isLoading = false;

  constructor(
    private readonly appService: AppService,
    private readonly router: Router,
    private readonly notifyService: NotifyService
  ) {}

  ngOnInit(): void {}

  handleSearch() {
    console.log('PESQUISA:', this.search);
    this.search = undefined;
  }

  verifyUserCredentials() {
    if (this.cpf) {
      this.isLoading = true;
      this.appService.findUser().subscribe({
        next: (res: any) => {
          const users: UserDto[] = res;
          if (users.length) {
            const isUser = users.find((user) => user.cpf === this.cpf);
            if (isUser) {
              setTimeout(() => {
                this.isLoading = false;
                this.router.navigateByUrl('/auth/sign-in');
              }, 1000);
            } else {
              this.isLoading = false;
              this.router.navigateByUrl('/auth/sign-up');
            }
          } else {
            this.isLoading = false;
            this.router.navigateByUrl('/auth/sign-up');
          }
        },
        error: (err) => {
          this.isLoading = false;
          throw new Error(err);
        },
      });
    }
  }
}
