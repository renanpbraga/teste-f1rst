import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { UserDto } from 'src/app/utils/dto/user-dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser?: UserDto;

  cards = [
    {
      title: 'Veículos',
      icon: 'icon-cab',
      link: '/financing/car'
    },
    {
      title: 'Imóveis',
      icon: 'icon-home',
      link: '/#'
    },
    {
      title: 'Re-negociação de dívidas',
      icon: 'icon-handshake-o',
      link: '/#'
    },
    {
      title: 'Empréstimos',
      icon: 'icon-money',
      link: '/#'
    },
  ]
  constructor(private readonly appService: AppService) {}

  ngOnInit(): void {
    this.appService.getUserFromStorage();
    this.appService.currentUser.subscribe({
      next: (res) => {
        this.currentUser = res;
      },
    });
  }
}
