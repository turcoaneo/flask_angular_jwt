import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPassFormComponent } from './user-pass-form.component';

describe('UserPassFormComponent', () => {
  let component: UserPassFormComponent;
  let fixture: ComponentFixture<UserPassFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPassFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
