import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesDividerComponent } from './resources-divider.component';

describe('ResourcesDividerComponent', () => {
  let component: ResourcesDividerComponent;
  let fixture: ComponentFixture<ResourcesDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesDividerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
