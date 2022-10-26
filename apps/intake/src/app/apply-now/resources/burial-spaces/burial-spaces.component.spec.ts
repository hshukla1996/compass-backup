import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurialSpacesComponent } from './burial-spaces.component';

describe('BurialSpacesComponent', () => {
  let component: BurialSpacesComponent;
  let fixture: ComponentFixture<BurialSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BurialSpacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BurialSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
