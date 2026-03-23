import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabLayout } from './collab-layout';

describe('CollabLayout', () => {
  let component: CollabLayout;
  let fixture: ComponentFixture<CollabLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollabLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(CollabLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
