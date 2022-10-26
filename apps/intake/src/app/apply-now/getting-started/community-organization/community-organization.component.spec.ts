import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityOrganizationComponent } from './community-organization.component';

describe('CommunityOrganizationComponent', () => {
  let component: CommunityOrganizationComponent;
  let fixture: ComponentFixture<CommunityOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityOrganizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
