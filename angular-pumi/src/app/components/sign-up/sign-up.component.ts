import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class SignUpComponent {
  signUpEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  signInPassPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  signUpForm = new FormGroup({
    signUpEmail: new FormControl('', [
      Validators.required,
      Validators.pattern(this.signUpEmailPattern),
    ]),
    signUpPass: new FormControl('', [
      Validators.pattern(this.signInPassPattern),
      Validators.required,
    ]),
    signUpConfirmPass: new FormControl('', [
      Validators.required,
    ]),
  });


  isInvaliPassConfirmation() {
    return this.signUpForm.controls.signUpPass.value !== this.signUpForm.controls.signUpConfirmPass.value;
  }


  formSubmit(form: FormGroup) {
    if (!form.valid) {
      console.log('Form not valid!');
      return;
    }
    let signUpEmail = form.controls['signUpEmail'].value;
    let signUpPass = form.controls['signUpPass'].value;
    let signUpConfirmPass = form.controls['signUpConfirmPass'].value;
    console.log('Email: ', signUpEmail, ' - pass: ', signUpPass, ' - confirm: ', signUpConfirmPass)
  }

  hide: boolean = true;

  myFunction() {
    this.hide = !this.hide;
  }
}
