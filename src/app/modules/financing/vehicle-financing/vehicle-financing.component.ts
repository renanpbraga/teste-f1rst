import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-financing',
  templateUrl: './vehicle-financing.component.html',
  styleUrls: ['./vehicle-financing.component.scss']
})
export class VehicleFinancingComponent implements OnInit {
  step = 1;

  constructor() { }

  ngOnInit(): void {
  }

  handleStep(step: number) {
    this.step = step;
  }


}
