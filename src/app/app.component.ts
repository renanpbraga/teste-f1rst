import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'teste-first';

  constructor(
    private readonly appService: AppService,
    private localeService: BsLocaleService
  ) {
    this.localeService.use('pt-br');
  }
  ngOnInit() {
    this.appService.getUserFromStorage();
  }
}
