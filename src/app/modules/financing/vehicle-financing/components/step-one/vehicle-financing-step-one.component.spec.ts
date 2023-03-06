import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFinancingStepOneComponent } from './vehicle-financing-step-one.component';

describe('VehicleFinancingStepOneComponent', () => {
  let component: VehicleFinancingStepOneComponent;
  let fixture: ComponentFixture<VehicleFinancingStepOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleFinancingStepOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleFinancingStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
