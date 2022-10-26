import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurialSpaceDetailsComponent } from './burial-space-details.component';

describe('BurialSpaceDetailsComponent', () => {
  let component: BurialSpaceDetailsComponent;
  let fixture: ComponentFixture<BurialSpaceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BurialSpaceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BurialSpaceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
