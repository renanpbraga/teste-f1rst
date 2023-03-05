import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarFinancingStepOneComponent } from './car-financing-step-one.component';

describe('CarFinancingStepOneComponent', () => {
  let component: CarFinancingStepOneComponent;
  let fixture: ComponentFixture<CarFinancingStepOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarFinancingStepOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarFinancingStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
