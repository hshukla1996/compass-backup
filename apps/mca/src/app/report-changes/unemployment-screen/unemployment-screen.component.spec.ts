import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnEmploymentScreenComponent } from './unemployment-screen.component';

describe('UnEmploymentScreenComponent', () => {
  let component: UnEmploymentScreenComponent;
  let fixture: ComponentFixture<UnEmploymentScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnEmploymentScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnEmploymentScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
