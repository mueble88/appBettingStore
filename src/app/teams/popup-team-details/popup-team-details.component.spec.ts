import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTeamDetailsComponent } from './popup-team-details.component';

describe('PopupTeamDetailsComponent', () => {
  let component: PopupTeamDetailsComponent;
  let fixture: ComponentFixture<PopupTeamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupTeamDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupTeamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
