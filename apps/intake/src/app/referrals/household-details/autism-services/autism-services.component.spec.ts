import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutismServicesComponent } from './autism-services.component';

describe('AutismServicesComponent', () => {
  let component: AutismServicesComponent;
  let fixture: ComponentFixture<AutismServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutismServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutismServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
