import { Component } from '@angular/core';
import { MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { SharedModule } from "../shared/shared.module";

import { type Application } from './../shared/application/application.model';
import { ApplicationsService } from '../shared/application/applications.service';
import { ApplicationComponent } from '../shared/application/application.component';
import { urlValidator } from '../shared/validators/validators';
import { UserInfo } from '../shared/user.model';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-ongoing-section',
  standalone: true,
  imports: [MatButtonModule, SharedModule, ApplicationComponent, MatIcon],
  templateUrl: './ongoing-section.component.html',
  styleUrl: './ongoing-section.component.css'
})
export class OngoingSectionComponent {
  applications: Application[] = [];
  constructor(private applicationsService: ApplicationsService, public dialog: MatDialog) {}
  showAll: boolean = false;
  showAmount = 3;

  ngOnInit() {
    this.applicationsService.applications$.subscribe(status => {
      this.applications = status.filter((application) => !(application.closedReason));
    })
  }

  // get applications(): Application[] {
  //   return this.applicationsService.getApplications().filter((application) => !(application.closedReason));
  // }
  toggleShow() {
    if (this.showAll)
    {
      this.showAmount = 3;
    }
    else
    {
      this.showAmount = this.applications.length;
    }
    this.showAll = !this.showAll;
  }

  openNewAppDialog() {
    this.dialog.open(NewAppDialog);
  }
}

@Component({
  selector: 'new-app-dialog',
  templateUrl: 'new-app-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatDatepickerModule,MatDatepickerModule,ReactiveFormsModule,MatCheckboxModule, FormsModule],
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS},
  ],
})
export class NewAppDialog {
  user: UserInfo = {
    id: 0,
    sessionToken: ''
  }

  ngOnInit(): void {
    this.userService.user$.subscribe(status => {
      this.user.id = status.id;
      this.user.sessionToken = status.sessionToken;
    });
  }


  readonly dateApplied = new FormControl(new Date());
  readonly dateClosed = new FormControl(new Date());
  applicationClosed: boolean = false;

  enteredCompany: string = '';
  enteredPosition: string = '';
  enteredType: string = '';
  enteredCity: string = '';
  enteredState: string = '';
  enteredMinPay: string = '';
  enteredMaxPay: string = '';
  enteredLinkToCompanySite: string = '';
  enteredLinkToJobPost: string = '';
  enteredDescriptionOfJob: string = '';
  enteredClosedReason?: string;
  enteredDateApplied: string = '';
  enteredDateClosed: string = '';

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewAppDialog>,
    private applicationsService: ApplicationsService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
      type: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      minPay: ['', Validators.required],
      maxPay: ['', Validators.required],
      linkToCompanySite: ['', urlValidator()],
      linkToJobPost: ['', urlValidator()],
      descriptionOfJob: ['', Validators.required],
      closed: [false],
      closedReason: [''],
      dateApplied: [this.dateApplied.value],
      dateClosed: [this.dateClosed.value]
    });
  }


  toggleApplicationClosed(event: Event) {
    this.applicationClosed = (event.target as HTMLInputElement).checked;
  }

  // constructor(public dialogRef: MatDialogRef<NewAppDialog>, private applicationsService: ApplicationsService) {}

  onAddButtonClick(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched(); // Mark all fields as touched to trigger validation
      return;
    }
    this.addApplication(form.value);
  }

  addApplication(formData: any) {
    // console.log('Form data:', {
    //   company: formData.company,
    //   position: formData.position,
    //   type: {
    //     id: 0,
    //     name: formData.type
    //   },
    //   location: formData.city + ", " + formData.state,
    //   minPay: formData.minPay,
    //   maxPay: formData.maxPay,
    //   linkToCompanySite: formData.linkToCompanySite,
    //   linkToJobPost: formData.linkToJobPost,
    //   descriptionOfJob: formData.descriptionOfJob,
    //   closed: formData.closed,
    //   closedReason: {
    //     id: 0,
    //     name: formData.closedReason
    //   },
    //   dateApplied: this.dateApplied.value?.getFullYear() + "-" + (this.dateApplied.value!.getMonth()+1) + "-" + this.dateApplied.value?.getDate(),
    //   dateClosed: (formData.closed) ? this.dateClosed.value?.getFullYear() + "-" + (this.dateClosed.value!.getMonth()+1) + "-" + this.dateClosed.value?.getDate() : undefined,
    // });

    this.applicationsService.addApplication({
      company: formData.company,
      position: formData.position,
      type: formData.type,
      location: formData.city + ", " + formData.state,
      minPay: formData.minPay,
      maxPay: formData.maxPay,
      linkToCompanySite: formData.linkToCompanySite,
      linkToJobPost: formData.linkToJobPost,
      descriptionOfJob: formData.descriptionOfJob,
      closed: formData.closed,
      closedReason: formData.closedReason,
      dateApplied: this.dateApplied.value?.getFullYear() + "-" + (this.dateApplied.value!.getMonth()+1) + "-" + this.dateApplied.value?.getDate(),
      dateClosed: (formData.closed) ? this.dateClosed.value?.getFullYear() + "-" + (this.dateClosed.value!.getMonth()+1) + "-" + this.dateClosed.value?.getDate() : '0001-01-01',
    }, this.user)

    // Perform further actions such as saving data to a service or API
    this.dialogRef.close();
  }
}
