import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignUpComponent} from './sign-up.component';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideRouter} from '@angular/router';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {SignUpComponentHarness} from './sign-up-component.harness';

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
    const componentHarness = await TestbedHarnessEnvironment.harnessForFixture(fixture, SignUpComponentHarness);
    let expected = await componentHarness.getParagraph();
    expect(expected).toContain('Already registered');
  });

  it('should show error on confirmed pass', async () => {
    const componentHarness = await TestbedHarnessEnvironment.harnessForFixture(fixture, SignUpComponentHarness);
    await componentHarness.setConfirmedPass('abcd');
    fixture.detectChanges();
    const isErrorShown = await componentHarness.isConfirmPassErrorShown();
    expect(isErrorShown).toBe(true);
  });

  it('should show required pass', async () => {
    const componentHarness = await TestbedHarnessEnvironment
      .harnessForFixture(fixture, SignUpComponentHarness);
    let control = component.signUpForm.get('signUpConfirmPass');
    control?.markAsDirty();
    const isErrorShown = await componentHarness.isRequiredPassErrorShown();
    expect(isErrorShown).toBe(true);
  });
});
