import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionManagement } from './mission-management';

describe('MissionManagement', () => {
  let component: MissionManagement;
  let fixture: ComponentFixture<MissionManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(MissionManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
