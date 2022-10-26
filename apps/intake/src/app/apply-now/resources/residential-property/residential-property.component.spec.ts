import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialPropertyComponent } from './residential-property.component';

describe('ResidentialPropertyComponent', () => {
  let component: ResidentialPropertyComponent;
  let fixture: ComponentFixture<ResidentialPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentialPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentialPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
