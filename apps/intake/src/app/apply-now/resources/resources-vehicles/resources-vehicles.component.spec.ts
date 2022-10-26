import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesVehiclesComponent } from './resources-vehicles.component';

describe('ResourcesVehiclesComponent', () => {
  let component: ResourcesVehiclesComponent;
  let fixture: ComponentFixture<ResourcesVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesVehiclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
