import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoPregnantComponent } from './who-pregnant.component';

describe('WhoPregnantComponent', () => {
  let component: WhoPregnantComponent;
  let fixture: ComponentFixture<WhoPregnantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoPregnantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoPregnantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
