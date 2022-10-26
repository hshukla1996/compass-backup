import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrantOrSeasonalFarmWorkerComponent } from './migrant-or-seasonal-farm-worker.component';

describe('MigrantOrSeasonalFarmWorkerComponent', () => {
  let component: MigrantOrSeasonalFarmWorkerComponent;
  let fixture: ComponentFixture<MigrantOrSeasonalFarmWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigrantOrSeasonalFarmWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrantOrSeasonalFarmWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
