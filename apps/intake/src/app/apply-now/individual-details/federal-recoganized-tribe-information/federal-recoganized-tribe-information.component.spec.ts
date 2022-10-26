import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederalRecoganizedTribeInformationComponent } from './federal-recoganized-tribe-information.component';

describe('FederalRecoganizedTribeInformationComponent', () => {
  let component: FederalRecoganizedTribeInformationComponent;
  let fixture: ComponentFixture<FederalRecoganizedTribeInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FederalRecoganizedTribeInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FederalRecoganizedTribeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
