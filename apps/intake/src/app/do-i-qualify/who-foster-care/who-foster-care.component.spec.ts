import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoFosterCareComponent } from './who-foster-care.component';

describe('WhoFosterCareComponent', () => {
  let component: WhoFosterCareComponent;
  let fixture: ComponentFixture<WhoFosterCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoFosterCareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoFosterCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
