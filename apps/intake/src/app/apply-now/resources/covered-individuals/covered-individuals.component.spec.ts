import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoveredIndividualsComponent } from './covered-individuals.component';

describe('CoveredIndividualsComponent', () => {
  let component: CoveredIndividualsComponent;
  let fixture: ComponentFixture<CoveredIndividualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoveredIndividualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoveredIndividualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
