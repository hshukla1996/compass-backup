import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPartnerPasswordComponent } from './community-partner-password.component';

describe('CommunityPartnerPasswordComponent', () => {
  let component: CommunityPartnerPasswordComponent;
  let fixture: ComponentFixture<CommunityPartnerPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityPartnerPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityPartnerPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
