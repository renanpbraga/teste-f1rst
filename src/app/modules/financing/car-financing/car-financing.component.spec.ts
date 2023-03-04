import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarFinancingComponent } from './car-financing.component';

describe('CarFinancingComponent', () => {
  let component: CarFinancingComponent;
  let fixture: ComponentFixture<CarFinancingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarFinancingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarFinancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
