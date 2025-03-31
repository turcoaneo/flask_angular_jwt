import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {RouterLink} from '@angular/router';
import {UserPassGroupComponent} from '../user-pass-group/user-pass-group.component';
import {REF} from '../../constants/list';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, UserPassGroupComponent]
})
export class SignUpComponent {
  hide: boolean = true;
  formKey = 'signUpUserPass';
  formEmail = 'signUpEmail';
  formPass = 'signUpPass';
  signUpForm = new FormGroup({
    signUpConfirmPass: new FormControl('', [
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
    let signUpEmail = form.get(this.formKey + REF + this.formEmail)?.value;
    let signUpPass = form.get(this.formKey + REF + this.formPass)?.value;
    let signUpConfirmPass = form.controls['signUpConfirmPass'].value;
    console.log('Email: ', signUpEmail, ' - pass: ', signUpPass, ' - confirm: ', signUpConfirmPass)
  }

  togglePassInputView() {
    this.hide = !this.hide;
  }
}
