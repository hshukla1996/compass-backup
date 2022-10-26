import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSIChangesComponent } from './ssi-changes.component';

describe('SSIChangesComponent', () => {
  let component: SSIChangesComponent;
  let fixture: ComponentFixture<SSIChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SSIChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SSIChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
