import {Component, inject, OnInit} from '@angular/core';
import {ControlContainer, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-pass-group',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-pass-group.component.html',
  styleUrl: './user-pass-group.component.css',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true}),
    },
  ],
})
export class UserPassGroupComponent implements OnInit {
  parentContainer = inject(ControlContainer);
  signInEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  signInPassPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    this.parentFormGroup.addControl('userPassGroup', new FormGroup({
      signInEmail: new FormControl('', [
          Validators.required,
          Validators.pattern(this.signInEmailPattern),
        ]),
        signInPass: new FormControl('', [
          Validators.required,
          Validators.pattern(this.signInPassPattern),
        ]),
      }),
    );
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl('userPassGroup');
  }

}
