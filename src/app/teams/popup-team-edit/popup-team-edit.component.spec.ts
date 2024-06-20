import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTeamEditComponent } from './popup-team-edit.component';

describe('PopupTeamEditComponent', () => {
  let component: PopupTeamEditComponent;
  let fixture: ComponentFixture<PopupTeamEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupTeamEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupTeamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
