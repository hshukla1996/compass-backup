import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInformationChangeComponent } from './contact_information_change.component';

describe('ContactInformationChangeComponent', () => {
  let component: ContactInformationChangeComponent;
  let fixture: ComponentFixture<ContactInformationChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactInformationChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInformationChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
