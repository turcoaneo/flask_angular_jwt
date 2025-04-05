import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {Router, RouterLink} from '@angular/router';
import {UserPassGroupComponent} from '../user-pass-group/user-pass-group.component';
import {REF} from '../../constants/list';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../common-css/style.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, UserPassGroupComponent]
})
export class SignUpComponent {
  router = inject(Router);
  authService = inject(AuthService);
  hide: boolean = true;
  formKey = 'signUpUserPass';
  formEmail = 'signUpEmail';
  formPass = 'signUpPass';
  signUpTried = false;

  signUpForm = new FormGroup({
    signUpConfirmPass: new FormControl('', [
      Validators.required,
    ]),
    signUpAlias: new FormControl('', [
      Validators.required,
    ]),
  });


  isInvaliPassConfirmation() {
    return this.signUpForm.get(this.formKey + REF + this.formPass)?.value !== this.signUpForm.controls.signUpConfirmPass.value;
  }


  formSubmit(form: FormGroup) {
    if (!form.valid) {
      console.log('Form not valid!');
      return;
    }
    this.signUpTried = false;
    let signUpEmail = form.get(this.formKey + REF + this.formEmail)?.value;
    let signUpPass = form.get(this.formKey + REF + this.formPass)?.value;
    let signUpConfirmPass = form.controls['signUpConfirmPass'].value;
    let alias = form.controls['signUpAlias'].value;
    console.log('Email: ', signUpEmail, 'alias: ', alias, ' - pass: ', signUpPass, ' - confirm: ', signUpConfirmPass);
    let result!: boolean;

    this.authService.signUp({email: signUpEmail, alias: alias, password: signUpPass})
      .subscribe(
        () => {
          result = this.authService.isUserCreated();
          console.log('Subscription sign-up inner result: ', result);
          if (result) {
            this.router.navigate(['/signin']).then(() => console.log('Registered, redirecting to sign-in...'));
          } else {
            this.signUpTried = true;
            setTimeout(() => {
              this.router.navigate(['/signup'])
                .then(() => console.log('Not created, redirecting to signup...'));
            }, 2000);
          }
        });
  }

  toggleConfirmPassInputView() {
    this.hide = !this.hide;
  }
}
