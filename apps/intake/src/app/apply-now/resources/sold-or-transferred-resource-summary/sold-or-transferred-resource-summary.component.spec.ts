import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldOrTransferredResourceSummaryComponent } from './sold-or-transferred-resource-summary.component';

describe('SoldOrTransferredResourceSummaryComponent', () => {
  let component: SoldOrTransferredResourceSummaryComponent;
  let fixture: ComponentFixture<SoldOrTransferredResourceSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoldOrTransferredResourceSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldOrTransferredResourceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
