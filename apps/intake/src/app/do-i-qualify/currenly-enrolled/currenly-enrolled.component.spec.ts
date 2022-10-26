import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenlyEnrolledComponent } from './currenly-enrolled.component';

describe('CurrenlyEnrolledComponent', () => {
  let component: CurrenlyEnrolledComponent;
  let fixture: ComponentFixture<CurrenlyEnrolledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrenlyEnrolledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenlyEnrolledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
