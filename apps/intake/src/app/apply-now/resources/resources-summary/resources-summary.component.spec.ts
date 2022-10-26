import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesSummaryComponent } from './resources-summary.component';

describe('ResourcesSummaryComponent', () => {
  let component: ResourcesSummaryComponent;
  let fixture: ComponentFixture<ResourcesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
