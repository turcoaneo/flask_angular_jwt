import {ComponentHarness} from '@angular/cdk/testing';

export class SignInComponentHarness extends ComponentHarness {
  // mandatory static field for Harness
  // noinspection JSUnusedGlobalSymbols
  static hostSelector = 'app-sign-in';
  protected getSubmitButton = this.locatorFor('button[type=submit]');
  protected passwordInput = this.locatorFor(`#componentPass`);
  protected emailInput = this.locatorFor(`#componentEmail`);

  async setComponentPass(inputText: string) {
    const testElement = await this.passwordInput();
    return await testElement.sendKeys(inputText);
  }


  async setComponentEmail(inputText: string) {
    const testElement = await this.emailInput();
    return await testElement.sendKeys(inputText);
  }

  async clickSubmit() {
    const submitBtn = await this.getSubmitButton();
    return await submitBtn.click();
  }

}
