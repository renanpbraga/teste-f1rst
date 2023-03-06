import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFinancingStepTwoComponent } from './vehicle-financing-step-two.component';

describe('VehicleFinancingStepTwoComponent', () => {
  let component: VehicleFinancingStepTwoComponent;
  let fixture: ComponentFixture<VehicleFinancingStepTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleFinancingStepTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleFinancingStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
