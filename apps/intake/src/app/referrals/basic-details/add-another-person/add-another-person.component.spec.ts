import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnotherPersonComponent } from './add-another-person.component';

describe('AddAnotherPersonComponent', () => {
  let component: AddAnotherPersonComponent;
  let fixture: ComponentFixture<AddAnotherPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnotherPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnotherPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
