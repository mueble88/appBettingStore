import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeletedUserComponent } from './confirm-deleted-user.component';

describe('ConfirmDeletedUserComponent', () => {
  let component: ConfirmDeletedUserComponent;
  let fixture: ComponentFixture<ConfirmDeletedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeletedUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeletedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
