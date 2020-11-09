import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultProvidersComponent } from './consult-providers.component';

describe('ConsultProvidersComponent', () => {
  let component: ConsultProvidersComponent;
  let fixture: ComponentFixture<ConsultProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
