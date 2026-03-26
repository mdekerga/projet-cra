import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCollab } from './navbar-collab';

describe('NavbarCollab', () => {
  let component: NavbarCollab;
  let fixture: ComponentFixture<NavbarCollab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarCollab],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarCollab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
