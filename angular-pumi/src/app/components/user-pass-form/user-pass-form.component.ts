import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-pass-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-pass-form.component.html',
  styleUrl: './user-pass-form.component.css'
})
export class UserPassFormComponent {
  @Input() formParent!: FormGroup;

  signInEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  signInPassPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  userPassGroup = new FormGroup({
    signInEmail: new FormControl('', [
      Validators.required,
      Validators.pattern(this.signInEmailPattern),
    ]),
    signInPass: new FormControl('', [
      Validators.required,
      Validators.pattern(this.signInPassPattern),
    ]),
  });

}
