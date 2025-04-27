import {ComponentHarness, TestElement} from '@angular/cdk/testing';

export class SignUpComponentHarness extends ComponentHarness {
  // mandatory static field for Harness
  // noinspection JSUnusedGlobalSymbols
  static hostSelector = 'app-sign-up';
  protected paragraph = this.locatorFor(`p`);
  protected confirmPassInput = this.locatorFor(`#signUpConfirmPass`);
  protected getConfirmPassErrorEl = this.locatorFor('#confirmPassError');
  protected getRequiredPassErrorEl = this.locatorFor('#signUpConfirmPassError');

  async getParagraph() {
    const testElement = await this.paragraph();
    return testElement.text();
  }

  async setConfirmedPass(inputText: string) {
    const testElement = await this.confirmPassInput();
    return await testElement.sendKeys(inputText);
  }

  async isRequiredPassErrorShown() {
    const expected = 'Password confirmation is required!';
    const passErrorEl = await this.getRequiredPassErrorEl();
    return await this.isErrorDisplayed(passErrorEl, expected);
  }

  async isConfirmPassErrorShown() {
    const expected = 'Password confirmation does not match the former password!';
    const passErrorEl = await this.getConfirmPassErrorEl();
    return await this.isErrorDisplayed(passErrorEl, expected);
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
