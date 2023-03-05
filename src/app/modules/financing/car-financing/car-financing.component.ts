import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-financing',
  templateUrl: './car-financing.component.html',
  styleUrls: ['./car-financing.component.scss']
})
export class CarFinancingComponent implements OnInit {
  step = 2;

  constructor() { }

  ngOnInit(): void {
  }

  handleStep(step: number) {
    this.step = step;
  }


}
