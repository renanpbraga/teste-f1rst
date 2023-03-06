import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFinancingComponent } from './vehicle-financing.component';

describe('VehicleFinancingComponent', () => {
  let component: VehicleFinancingComponent;
  let fixture: ComponentFixture<VehicleFinancingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleFinancingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleFinancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
