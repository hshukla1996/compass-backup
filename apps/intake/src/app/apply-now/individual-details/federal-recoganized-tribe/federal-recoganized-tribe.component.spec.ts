import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederalRecoganizedTribeComponent } from './federal-recoganized-tribe.component';

describe('FederalRecoganizedTribeComponent', () => {
  let component: FederalRecoganizedTribeComponent;
  let fixture: ComponentFixture<FederalRecoganizedTribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FederalRecoganizedTribeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FederalRecoganizedTribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
