import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingAccountComponent } from './existing-account.component';

describe('ExistingAccountComponent', () => {
  let component: ExistingAccountComponent;
  let fixture: ComponentFixture<ExistingAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
