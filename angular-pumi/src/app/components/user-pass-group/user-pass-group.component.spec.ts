import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPassGroupComponent } from './user-pass-group.component';

describe('UserPassFormComponent', () => {
  let component: UserPassGroupComponent;
  let fixture: ComponentFixture<UserPassGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPassGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPassGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
