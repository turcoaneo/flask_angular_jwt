import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignUpComponent} from './sign-up.component';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideRouter} from '@angular/router';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {SignUpComponentHarness} from './sign-up-component.harness';
import {By} from '@angular/platform-browser';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [SignUpComponent, provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show paragraph content', async () => {
    const vcHarness = await TestbedHarnessEnvironment.harnessForFixture(fixture, SignUpComponentHarness);
    let expected = await vcHarness.getParagraph();
    expect(expected).toContain('Already registered');
  });

  it('should show error on confirmed pass', async () => {
    const vcHarness = await TestbedHarnessEnvironment.harnessForFixture(fixture, SignUpComponentHarness);
    await vcHarness.setConfirmedPass('abcd');
    fixture.detectChanges();
    const isErrorShown = await vcHarness.isConfirmPassErrorShown();
    expect(isErrorShown).toBe(true);
  });

  it('should show required pass', async () => {
    const vcHarness = await TestbedHarnessEnvironment.harnessForFixture(fixture, SignUpComponentHarness);
    let control = component.signUpForm.get('signUpConfirmPass');
    control?.markAsDirty();
    // fixture.detectChanges();
    const isErrorShown = await vcHarness.isRequiredPassErrorShown();
    expect(isErrorShown).toBe(true);
  });
});
