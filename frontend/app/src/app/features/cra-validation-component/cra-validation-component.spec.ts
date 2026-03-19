import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraValidationComponent } from './cra-validation-component';

describe('CraValidationComponent', () => {
  let component: CraValidationComponent;
  let fixture: ComponentFixture<CraValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CraValidationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CraValidationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
