import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraForm } from './cra-form';

describe('CraForm', () => {
  let component: CraForm;
  let fixture: ComponentFixture<CraForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CraForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CraForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
