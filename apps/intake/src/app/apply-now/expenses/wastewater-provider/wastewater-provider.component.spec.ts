import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WastewaterProviderComponent } from './wastewater-provider.component';

describe('WastewaterProviderComponent', () => {
  let component: WastewaterProviderComponent;
  let fixture: ComponentFixture<WastewaterProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WastewaterProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WastewaterProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
