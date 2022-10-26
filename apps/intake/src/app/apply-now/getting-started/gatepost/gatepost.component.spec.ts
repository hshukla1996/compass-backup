import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatepostComponent } from './gatepost.component';

describe('GatepostComponent', () => {
  let component: GatepostComponent;
  let fixture: ComponentFixture<GatepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatepostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
