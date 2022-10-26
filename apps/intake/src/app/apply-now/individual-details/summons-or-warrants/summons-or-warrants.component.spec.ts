import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonsOrWarrantsComponent } from './summons-or-warrants.component';

describe('SummonsOrWarrantsComponent', () => {
  let component: SummonsOrWarrantsComponent;
  let fixture: ComponentFixture<SummonsOrWarrantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummonsOrWarrantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummonsOrWarrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
