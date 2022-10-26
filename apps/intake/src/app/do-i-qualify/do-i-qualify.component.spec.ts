import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoIQualifyComponent } from './do-i-qualify.component';

describe('DoIQualifyComponent', () => {
  let component: DoIQualifyComponent;
  let fixture: ComponentFixture<DoIQualifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoIQualifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoIQualifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
