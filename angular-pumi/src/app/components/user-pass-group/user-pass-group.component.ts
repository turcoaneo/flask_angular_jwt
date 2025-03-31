import {Component, inject, Input, OnInit} from '@angular/core';
import {ControlContainer, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-pass-group',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-pass-group.component.html',
  styleUrls: ['./user-pass-group.component.css', '../common-css/style.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true}),
    },
  ],
})
export class UserPassGroupComponent implements OnInit {
  @Input({required: true}) componentKey = '';
  @Input({required: true}) componentEmail = '';
  @Input({required: true}) componentPass = '';
  parentContainer = inject(ControlContainer);
  signInEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  signInPassPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    let formGroup = new FormGroup({});
    formGroup.addControl(this.componentEmail, new FormControl('', [
      Validators.required,
      Validators.pattern(this.signInEmailPattern),
    ]));
    formGroup.addControl(this.componentPass, new FormControl('', [
      Validators.required,
      Validators.pattern(this.signInPassPattern),
    ]));
    this.parentFormGroup.addControl(this.componentKey, formGroup);
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.componentKey);
  }

}
