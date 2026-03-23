import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraSaisie } from './cra-saisie';

describe('CraSaisie', () => {
  let component: CraSaisie;
  let fixture: ComponentFixture<CraSaisie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CraSaisie],
    }).compileComponents();

    fixture = TestBed.createComponent(CraSaisie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
