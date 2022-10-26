import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentRelativeResponsibleForComponent } from './absent-relative-responsible-for.component';

describe('AbsentRelativeResponsibleForComponent', () => {
  let component: AbsentRelativeResponsibleForComponent;
  let fixture: ComponentFixture<AbsentRelativeResponsibleForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsentRelativeResponsibleForComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentRelativeResponsibleForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
