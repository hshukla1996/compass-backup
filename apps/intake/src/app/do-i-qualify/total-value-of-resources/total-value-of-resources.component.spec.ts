import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalValueOfResourcesComponent } from './total-value-of-resources.component';

describe('TotalValueOfResourcesComponent', () => {
  let component: TotalValueOfResourcesComponent;
  let fixture: ComponentFixture<TotalValueOfResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalValueOfResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalValueOfResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
