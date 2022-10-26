import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonDetailsComponent } from './add-person-details.component';

describe('AddPersonDetailsComponent', () => {
  let component: AddPersonDetailsComponent;
  let fixture: ComponentFixture<AddPersonDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPersonDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
