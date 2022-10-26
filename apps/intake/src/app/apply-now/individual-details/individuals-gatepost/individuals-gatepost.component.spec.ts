import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualsGatepostComponent } from './individuals-gatepost.component';

describe('GeneralDetailsComponent', () => {
  let component: IndividualsGatepostComponent;
  let fixture: ComponentFixture<IndividualsGatepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndividualsGatepostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualsGatepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
