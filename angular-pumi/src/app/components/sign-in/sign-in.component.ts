import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {REF} from '../../constants/list';
import {FormGroup, ReactiveFormsModule} from '@angular/forms'
import {Router, RouterLink} from '@angular/router';
import {UserPassGroupComponent} from '../user-pass-group/user-pass-group.component';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css', '../common-css/style.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, UserPassGroupComponent]
})
export class SignInComponent {
  router = inject(Router);
  authService = inject(AuthService);
  formKey = 'signInUserPass';
  formEmail = 'signInEmail';
  formPass = 'signInPass';

  signInForm = new FormGroup({});

  formSubmit(form: FormGroup) {
    if (!form.valid) {
      console.log('Form not valid!');
      return;
    }
    let signInEmail = form.get(this.formKey + REF + this.formEmail)?.value;
    let signInPass = form.get(this.formKey + REF + this.formPass)?.value;
    console.log('Email: ', signInEmail, ' - pass: ', signInPass);
    let result!: boolean;
    this.authService.login({email: signInEmail, password: signInPass})
      .subscribe(
        () => {
          result = this.authService.isAuthenticated();
          console.log('Subscription inner result: ', result);
          if (result) {
            this.router.navigate(['/']).then(() => console.log('Authenticated, redirecting to home...'));
          } else {
            this.router.navigate(['/signup']).then(() => console.log('Not authenticated, redirecting to signup...'));
          }
        })
  }
}
