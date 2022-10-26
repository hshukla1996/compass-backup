import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwMessageBannerComponent } from './cw-message-banner.component';

describe('CwMessageBannerComponent', () => {
  let component: CwMessageBannerComponent;
  let fixture: ComponentFixture<CwMessageBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwMessageBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwMessageBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
