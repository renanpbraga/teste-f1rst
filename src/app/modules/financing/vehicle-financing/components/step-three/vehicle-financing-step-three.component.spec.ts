import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFinancingStepThreeComponent } from './vehicle-financing-step-three.component';

describe('VehicleFinancingStepThreeComponent', () => {
  let component: VehicleFinancingStepThreeComponent;
  let fixture: ComponentFixture<VehicleFinancingStepThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleFinancingStepThreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleFinancingStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
