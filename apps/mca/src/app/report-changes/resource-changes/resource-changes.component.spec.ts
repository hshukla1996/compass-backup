import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceChangesComponent } from './resource-changes.component';

describe('ResourceChangesComponent', () => {
  let component: ResourceChangesComponent;
  let fixture: ComponentFixture<ResourceChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
