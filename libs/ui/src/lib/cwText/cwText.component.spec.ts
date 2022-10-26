import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CWTextComponent } from './cwText.component';

describe('CWTextComponent', () => {
  let component: CWTextComponent;
  let fixture: ComponentFixture<CWTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CWTextComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CWTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
