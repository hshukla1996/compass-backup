import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderInformationComponent } from './provider-information.component';

describe('ProviderInformationComponent', () => {
  let component: ProviderInformationComponent;
  let fixture: ComponentFixture<ProviderInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
