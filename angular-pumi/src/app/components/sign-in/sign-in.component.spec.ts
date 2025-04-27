import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SignInComponent} from './sign-in.component';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideRouter} from '@angular/router';
import {ControlContainer, FormsModule} from '@angular/forms';
import {UserPassGroupComponent} from '../user-pass-group/user-pass-group.component';
import {By} from '@angular/platform-browser';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {SignInComponentHarness} from './sign-in-component.harness';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [SignInComponent, ControlContainer, UserPassGroupComponent,
        provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show not valid form', async () => {
    component.signInForm.setValue({
      "signInUserPass": {
        "signInEmail": "invalid email",
        "signInPass": "user234&"
      }
    });

    expect(component.signInForm.valid).toEqual(false);
    let element = fixture.debugElement.query(By.css('p'));
    const info = element.nativeElement;
    expect(info.textContent.trim()).toContain('Create an account for one month free trial');
  });

  it('should show valid form', async () => {
    component.signInForm.setValue({
      "signInUserPass": {
        "signInEmail": "user@user.ro",
        "signInPass": "user234*"
      }
    });
    expect(component.signInForm.valid).toEqual(true);
  });


  it('should show paragraph content', async () => {
    const vcHarness = await TestbedHarnessEnvironment.harnessForFixture(fixture, SignInComponentHarness);
    let expected = await vcHarness.getParagraph();
    expect(expected).toContain('Not registered');
  });

});
