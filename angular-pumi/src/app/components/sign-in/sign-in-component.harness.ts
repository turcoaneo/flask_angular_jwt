import {ComponentHarness} from '@angular/cdk/testing';

export class SignInComponentHarness extends ComponentHarness {
  // mandatory static field for Harness
  // noinspection JSUnusedGlobalSymbols
  static hostSelector = 'app-sign-in';
  protected paragraph = this.locatorFor(`p`);

  async getParagraph() {
    const testElement = await this.paragraph();
    return testElement.text();
  }
}
