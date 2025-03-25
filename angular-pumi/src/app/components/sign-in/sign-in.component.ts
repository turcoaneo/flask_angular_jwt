import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class SignInComponent {
  signInEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  signInPassPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  signInForm = new FormGroup({
    signInEmail: new FormControl('', [
      Validators.required,
      Validators.pattern(this.signInEmailPattern),
    ]),
    signInPass: new FormControl('', [
      Validators.required,
      Validators.pattern(this.signInPassPattern),
    ]),
  });

  formSubmit(form: FormGroup) {
    if (!form.valid) {
      console.log('Form not valid!');
      return;
    }
    let signInEmail = form.controls['signInEmail'].value;
    let signInPass = form.controls['signInPass'].value;
    console.log('Email: ', signInEmail, ' - pass: ', signInPass)
  }
}
