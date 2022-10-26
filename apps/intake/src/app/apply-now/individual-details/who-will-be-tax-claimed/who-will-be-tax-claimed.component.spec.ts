import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoWillBeTaxClaimedComponent } from './who-will-be-tax-claimed.component';

describe('BenefitsNotReceviedComponent', () => {
  let component: WhoWillBeTaxClaimedComponent;
  let fixture: ComponentFixture<WhoWillBeTaxClaimedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhoWillBeTaxClaimedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoWillBeTaxClaimedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
