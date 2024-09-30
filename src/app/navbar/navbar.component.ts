import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { provideNativeDateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { ApplicationsService } from '../shared/application/applications.service';
import { confirmPasswordValidator } from '../shared/validators/validators';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDivider, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor(private applicationsService: ApplicationsService,
    private userService: UserService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.loggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    })
  }

  openSignUpDialog() {
    this.dialog.open(CreateAccountDialog, {
      width: '50%',
    });
  }

  openLoginDialog() {
    this.dialog.open(LoginDialog, {
      width: '50%',
    });
  }

  onClickSignOut() {
    this.userService.signOut();
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
    this.form = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(64)]),
        password1: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
        password2: new FormControl<string>('', [Validators.required]),
      },
      { validators: confirmPasswordValidator }
    );
  }

  checkFormErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const controlErrors: ValidationErrors | null | undefined = formGroup.get(key)?.errors;
      if (controlErrors != null && controlErrors != undefined) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', error value: ', controlErrors[keyError]);
        });
      }
    });

    const formGroupErrors: ValidationErrors | null = formGroup.errors;
    if (formGroupErrors) {
      Object.keys(formGroupErrors).forEach(keyError => {
        console.log('FormGroup error: ' + keyError + ', error value: ', formGroupErrors[keyError]);
      });
    }
  }

  get emailFormControl() {
    return this.form.get('email');
  }

  get password1FormControl() {
    return this.form.get('password1');
  }

  get password2FormControl() {
    return this.form.get('password2');
  }

  get formGroupErrors() {
    return this.form.errors;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onSignUpButtonClick() {
    // console.log(this.password2FormControl.errors);
    console.log('Errors: ' + this.form.errors);
    console.log('Invalid: ' + this.form.invalid);
    this.checkFormErrors(this.form);

    console.log("NoMatch: " + this.form.hasError('PasswordNoMatch'));
    if (this.form.invalid)
    {
      this.markFormGroupTouched(this.form);
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
  imports: [MatDialogModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, MatIcon],
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS},
  ],
})
export class LoginDialog {
  applicationClosed: boolean = false;

  enteredEmail: string = '';
  enteredPassword: string = '';

  hide = signal(true);

  clickHide(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateAccountDialog>,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  isLoggedIn = this.userService.isLoggedIn();

  async onLoginButtonClick(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched(); // Mark all fields as touched to trigger validation
      return;
    }
    console.log(form.value);

    try {
      const success: boolean = await this.userService.login(form.value.email, form.value.password);

      if (success) {
        console.log("Navbar: Login Successful");
        this.dialogRef.close();
      } else {
        // Display error
        console.log("Navbar: Error logging in");
      }
    } catch (error) {
      console.error("Navbar: An error occurred while logging in", error);
    }
  }
}
