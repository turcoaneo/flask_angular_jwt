import {Component} from '@angular/core';
import {ControlContainer, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserPassGroupComponent} from './user-pass-group.component';

@Component({
  selector: 'app-host',
  standalone: true, // ✅ Standalone component
  imports: [ReactiveFormsModule, UserPassGroupComponent], // ✅ Import ReactiveFormsModule
  template: `
      <form [formGroup]="parentFormGroup">
          <app-user-pass-group [componentEmail]=any [componentKey]=any [componentPass]=any></app-user-pass-group>
      </form>`,
})
export class HostComponent {
  parentFormGroup = new FormGroup({});
  protected readonly any = 'any';
}

describe('UserPassGroupComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPassGroupComponent], // ✅ Import the standalone component instead of declaring it
      providers: [
        {provide: ControlContainer, useValue: {control: new FormGroup({})}}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should initialize correctly', () => {
    expect(fixture.componentInstance.parentFormGroup).toBeTruthy();
  });
});
