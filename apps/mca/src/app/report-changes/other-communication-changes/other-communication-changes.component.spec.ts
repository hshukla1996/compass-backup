import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherCommunicationChangesComponent } from './other-communication-changes.component';

describe('OtherCommunicationChangesComponent', () => {
  let component: OtherCommunicationChangesComponent;
  let fixture: ComponentFixture<OtherCommunicationChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherCommunicationChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherCommunicationChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
