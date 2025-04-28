import {ComponentHarness, TestElement} from '@angular/cdk/testing';

export class UserPassComponentHarness extends ComponentHarness {
  // mandatory static field for Harness
  // noinspection JSUnusedGlobalSymbols
  static hostSelector = 'app-user-pass-group';
  protected passPassInput = this.locatorFor(`#componentPass`);
  protected emailPassInput = this.locatorFor(`#componentEmail`);
  protected getEmailErrorEl = this.locatorFor('#patternEmailError');
  protected getPatternPassErrorEl = this.locatorFor('#patternPassError');

  async setComponentPass(inputText: string) {
    const testElement = await this.passPassInput();
    return await testElement.sendKeys(inputText);
  }


  async setComponentEmail(inputText: string) {
    const testElement = await this.emailPassInput();
    return await testElement.sendKeys(inputText);
  }

  async isPassPatternErrorShown() {
    const expected = 'Password does not match the required pattern!';
    const passErrorEl = await this.getPatternPassErrorEl();
    return await this.isErrorDisplayed(passErrorEl, expected);
  }

  async isEmailErrorShown() {
    const expected = 'Email does not match the usual pattern (name[at]domain.com)!';
    const errorEl = await this.getEmailErrorEl();
    return await this.isErrorDisplayed(errorEl, expected);
  }

  private async isErrorDisplayed(confirmPassErrorEl: TestElement, expected: string) {
    const confirmPassText = await confirmPassErrorEl.text();
    const isErrorShown = confirmPassText.trim() === expected;
    if (!isErrorShown) {
      console.log({
        actual: confirmPassText.trim(),
        expected
      });
    }
    return isErrorShown;
  }
}
