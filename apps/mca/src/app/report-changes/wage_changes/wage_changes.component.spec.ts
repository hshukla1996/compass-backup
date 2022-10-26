import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WageChangesComponent } from './wage_changes.component';

describe('WageChangesComponent', () => {
  let component: WageChangesComponent;
  let fixture: ComponentFixture<WageChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WageChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WageChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
