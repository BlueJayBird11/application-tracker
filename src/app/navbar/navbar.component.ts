import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, ErrorStateMatcher } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { ApplicationsService } from '../shared/application/applications.service';
import { passwordValidator, urlValidator } from '../shared/validators/validators';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDivider, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private applicationsService: ApplicationsService, public dialog: MatDialog) {}
  openSignUpDialog() {
    this.dialog.open(CreateAccountDialog);
  }

  openLoginDialog() {
    this.dialog.open(LoginDialog);
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'create-account-dialog',
  templateUrl: 'create-account-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, MatIcon],
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS},
  ],
})
export class CreateAccountDialog {
  enteredEmail: string = '';
  enteredPassword1: string = '';
  enteredPassword2: string = '';

  emailFormControl = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(64)]);
  password2FormControl = new FormControl('', [Validators.required, passwordValidator(this.enteredPassword1)]);

  hide = signal(true);
  hide2 = signal(true);

  clickHide1(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  clickHide2(event: MouseEvent) {
    this.hide2.set(!this.hide2());
    event.stopPropagation();
  }

  matcher = new MyErrorStateMatcher();

  applicationClosed: boolean = false;



  form: FormGroup;

  passwordsAreEqual: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<CreateAccountDialog>,
    private applicationsService: ApplicationsService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required, Validators.email, Validators.maxLength(64)],
      password1: ['', Validators.required, Validators.maxLength(64)],
      password2: ['', Validators.required, Validators.maxLength(64)],
    });
  }

  onSignUpButtonClick(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched(); // Mark all fields as touched to trigger validation
      return;
    }
    if (this.enteredPassword1 !== this.enteredPassword2)
    {
      this.passwordsAreEqual = false;
      form.control.markAllAsTouched();
      return;
    }

    // Make request

    console.log("Login");
  }
}

@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule],
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS},
  ],
})
export class LoginDialog {
  applicationClosed: boolean = false;

  enteredEmail: string = '';
  enteredPassword: string = '';

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateAccountDialog>,
    private applicationsService: ApplicationsService,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSignUpButtonClick(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched(); // Mark all fields as touched to trigger validation
      return;
    }
  }
}
