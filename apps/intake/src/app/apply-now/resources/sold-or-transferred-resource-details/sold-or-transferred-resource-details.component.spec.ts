import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldOrTransferredResourceDetailsComponent } from './sold-or-transferred-resource-details.component';

describe('SoldOrTransferredResourceDetailsComponent', () => {
  let component: SoldOrTransferredResourceDetailsComponent;
  let fixture: ComponentFixture<SoldOrTransferredResourceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoldOrTransferredResourceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldOrTransferredResourceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
