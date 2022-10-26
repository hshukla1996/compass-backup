import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilySafetyComponent } from './family-safety.component';

describe('FamilySafetyComponent', () => {
  let component: FamilySafetyComponent;
  let fixture: ComponentFixture<FamilySafetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilySafetyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilySafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
