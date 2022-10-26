import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeoneElseComponent } from './someone-else.component';

describe('SomeoneElseComponent', () => {
  let component: SomeoneElseComponent;
  let fixture: ComponentFixture<SomeoneElseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SomeoneElseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SomeoneElseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
