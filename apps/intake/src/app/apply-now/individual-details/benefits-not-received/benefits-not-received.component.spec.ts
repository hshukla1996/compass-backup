import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsNotReceviedComponent } from './benefits-not-received.component';

describe('BenefitsNotReceviedComponent', () => {
  let component: BenefitsNotReceviedComponent;
  let fixture: ComponentFixture<BenefitsNotReceviedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitsNotReceviedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsNotReceviedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
