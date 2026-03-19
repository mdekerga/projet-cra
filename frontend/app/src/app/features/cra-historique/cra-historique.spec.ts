import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraHistorique } from './cra-historique';

describe('CraHistorique', () => {
  let component: CraHistorique;
  let fixture: ComponentFixture<CraHistorique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CraHistorique],
    }).compileComponents();

    fixture = TestBed.createComponent(CraHistorique);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
