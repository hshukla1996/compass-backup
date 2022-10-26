import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesGatepostComponent } from './resources-gatepost.component';

describe('ResourcesGatepostComponent', () => {
  let component: ResourcesGatepostComponent;
  let fixture: ComponentFixture<ResourcesGatepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesGatepostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesGatepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
