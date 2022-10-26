import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WastewaterAddressComponent } from './wastewater-address.component';

describe('WastewaterAddressComponent', () => {
  let component: WastewaterAddressComponent;
  let fixture: ComponentFixture<WastewaterAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WastewaterAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WastewaterAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
