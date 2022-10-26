import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterGatepostComponent } from './water-gatepost.component';

describe('WaterGatepostComponent', () => {
  let component: WaterGatepostComponent;
  let fixture: ComponentFixture<WaterGatepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterGatepostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterGatepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
