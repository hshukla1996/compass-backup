import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedMoneyStructureComponent } from './expected-money-structure.component';

describe('ExpectedMoneyStructureComponent', () => {
  let component: ExpectedMoneyStructureComponent;
  let fixture: ComponentFixture<ExpectedMoneyStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpectedMoneyStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpectedMoneyStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
