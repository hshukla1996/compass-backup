import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurialSpacesSummaryComponent } from './burial-spaces-summary.component';

describe('BurialSpacesSummaryComponent', () => {
  let component: BurialSpacesSummaryComponent;
  let fixture: ComponentFixture<BurialSpacesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BurialSpacesSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BurialSpacesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
