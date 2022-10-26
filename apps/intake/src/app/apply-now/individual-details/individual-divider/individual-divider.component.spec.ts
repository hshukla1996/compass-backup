import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualDividerComponent } from './individual-divider.component';

describe('IndividualDividerComponent', () => {
  let component: IndividualDividerComponent;
  let fixture: ComponentFixture<IndividualDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualDividerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
