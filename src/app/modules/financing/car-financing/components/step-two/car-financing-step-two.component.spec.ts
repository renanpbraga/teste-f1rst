import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarFinancingStepTwoComponent } from './car-financing-step-two.component';

describe('CarFinancingStepTwoComponent', () => {
  let component: CarFinancingStepTwoComponent;
  let fixture: ComponentFixture<CarFinancingStepTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarFinancingStepTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarFinancingStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
