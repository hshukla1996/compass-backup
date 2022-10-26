import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RSDIChangesComponent } from './rsdi-changes.component';

describe('RSDIChangesComponent', () => {
  let component: RSDIChangesComponent;
  let fixture: ComponentFixture<RSDIChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RSDIChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RSDIChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
