import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoHasDisabilityComponent } from './who-has-disability.component';

describe('WhoHasDisabilityComponent', () => {
  let component: WhoHasDisabilityComponent;
  let fixture: ComponentFixture<WhoHasDisabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoHasDisabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoHasDisabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
