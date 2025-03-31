import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms'
import {RouterLink} from '@angular/router';
import {UserPassGroupComponent} from '../user-pass-group/user-pass-group.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, UserPassGroupComponent]
})
export class SignInComponent {
  signInForm = new FormGroup({
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
