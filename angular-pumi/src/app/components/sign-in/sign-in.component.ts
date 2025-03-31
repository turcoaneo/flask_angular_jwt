import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'
import {RouterLink} from '@angular/router';
import {UserPassFormComponent} from '../user-pass-form/user-pass-form.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, UserPassFormComponent]
})
export class SignInComponent {
  signInForm = new FormGroup({
    userPassGroup: new FormGroup({
      signInEmail: new FormControl(''),
      signInPass: new FormControl(''),
    }),
  });

  formSubmit(form: FormGroup) {
    if (!form.valid) {
      console.log('Form not valid!');
      return;
    }
    let signInEmail = form.get('userPassGroup.signInEmail')?.value;
    let signInPass = form.get('userPassGroup.signInPass')?.value;
    console.log('Email: ', signInEmail, ' - pass: ', signInPass)
  }
}
