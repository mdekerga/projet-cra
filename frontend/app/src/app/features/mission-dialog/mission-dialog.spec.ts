import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionDialog } from './mission-dialog';

describe('MissionDialog', () => {
  let component: MissionDialog;
  let fixture: ComponentFixture<MissionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(MissionDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
