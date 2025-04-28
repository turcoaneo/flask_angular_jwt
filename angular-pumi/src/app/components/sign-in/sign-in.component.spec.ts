import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SignInComponent} from './sign-in.component';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideRouter} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UserPassGroupComponent} from '../user-pass-group/user-pass-group.component';
import {By} from '@angular/platform-browser';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {SignInComponentHarness} from './sign-in-component.harness';
import {UserPassComponentHarness} from '../user-pass-group/user-pass-component.harness';
import SpyInstance = jest.SpyInstance;

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [SignInComponent, UserPassGroupComponent,
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

  function setFormInputs(signInEmail, signInPass) {
    component.signInForm.setValue({
      "signInUserPass": {
        "signInEmail": signInEmail,
        "signInPass": signInPass
      }
    });
  }

  it('should show not valid form', async () => {
    setFormInputs("invalid email", "user234&");

    expect(component.signInForm.valid).toEqual(false);
    let element = fixture.debugElement.query(By.css('p'));
    const info = element.nativeElement;
    expect(info.textContent.trim()).toContain('Create an account for one month free trial');
  });

  it('should show valid form', async () => {
    setFormInputs("user@user.ro", "user234&");
    expect(component.signInForm.valid).toEqual(true);
  });

  type ParameterizedDataSet = [email: any, password: any, result: string];
  it.each<ParameterizedDataSet>([
    ['user@user.ro', 'user234&', 'Auth Service Login: user@user.ro'],
    ['user@email.ro', 'user234*', 'Auth Service Login: user@email.ro'],
    ['user@email.ro', 'wrong special char ^ 234', 'Form not valid!'],
    ['user@email.ro', 'no digit&', 'Form not valid!'],
    ['bad.email@error', 'user234*', 'Form not valid!'],
    [null, 'user234^', 'Form not valid!'],
    ['user@user.ro', null, 'Form not valid!'],
    [null, null, 'Form not valid!'],
  ])
  ('should show form state by console log', async (email, password, result) => {
    // noinspection TypeScriptValidateTypes
    const logSpy: SpyInstance = jest.spyOn(console, 'log');
    const componentHarness = await TestbedHarnessEnvironment
      .harnessForFixture(fixture, SignInComponentHarness);

    if (!!email) {
      await componentHarness.setComponentEmail(email);
    }
    if (!!password) {
      await componentHarness.setComponentPass(password);
    }
    await componentHarness.clickSubmit();
    fixture.detectChanges();

    expect(logSpy).toHaveBeenCalledWith(result);
    logSpy.mockClear();
  });

  it('should show child email pattern error', async () => {
    const harnessLoader = TestbedHarnessEnvironment.loader(fixture);
    const childHarness = await harnessLoader.getHarness(UserPassComponentHarness);
    await childHarness.setComponentEmail('bcd');
    let isErrorShown = await childHarness.isEmailErrorShown();
    expect(isErrorShown).toBe(true);
  });

  it('should show child password pattern error', async () => {
    const harnessLoader = TestbedHarnessEnvironment.loader(fixture);
    const childHarness = await harnessLoader.getHarness(UserPassComponentHarness);
    await childHarness.setComponentPass("pass");
    let isErrorShown = await childHarness.isPassPatternErrorShown();
    expect(isErrorShown).toBe(true);
  });

});
