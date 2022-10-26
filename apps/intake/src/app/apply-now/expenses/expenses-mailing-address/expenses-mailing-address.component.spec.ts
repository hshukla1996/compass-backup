import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesMailingAddressComponent } from './expenses-mailing-address.component';

describe('ExpensesMailingAddressComponent', () => {
  let component: ExpensesMailingAddressComponent;
  let fixture: ComponentFixture<ExpensesMailingAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesMailingAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesMailingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
