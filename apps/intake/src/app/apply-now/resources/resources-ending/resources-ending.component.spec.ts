import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesEndingComponent } from './resources-ending.component';

describe('ResourcesEndingComponent', () => {
  let component: ResourcesEndingComponent;
  let fixture: ComponentFixture<ResourcesEndingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesEndingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesEndingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
