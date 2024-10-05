import { Component, input, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { SharedModule } from '../shared.module';
import { type Application } from './application.model';
import { ApplicationsService } from './applications.service';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { UserService } from '../user.service';
import { UserInfo } from '../user.model';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, SharedModule, MatIconModule, MatMenuModule, DatePipe],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent {
  application = input.required<Application>();
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(AppDialog, {
      data: this.application(),
    });
  }

  openEditDialog() {
    this.dialog.open(EditAppDialog, {
      data: this.application(),
    });
  }

  openDeleteDialog() {
    this.dialog.open(DeleteAppDialog, {
      data: this.application().id,
    })
  }
}


@Component({
  selector: 'app-dialog',
  templateUrl: 'app-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class AppDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Application) {}
}


@Component({
  selector: 'edit-app-dialog',
  templateUrl: 'edit-app-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatDatepickerModule,MatDatepickerModule,ReactiveFormsModule,MatCheckboxModule, FormsModule],
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS},
  ],
})
export class EditAppDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Application, public dialogRef: MatDialogRef<EditAppDialog>, private applicationsService: ApplicationsService, private userService: UserService) {}

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

  incrementDate(date: string): Date {
    let newdate = new Date(date);
    newdate.setDate(newdate.getDate() + 1);
    return newdate;
  }

  dateClosedDate: Date = (this.data.closedReason ? new Date(this.incrementDate(this.data.dateClosed!)) : new Date());

  readonly dateApplied = new FormControl(new Date(this.incrementDate(this.data.dateApplied)));
  readonly dateClosed = (this.data.closedReason ? new FormControl(this.dateClosedDate) : new FormControl(new Date()));

  applicationClosed: boolean = (this.data.closedReason != null);

  id: number = this.data.id;

  enteredCompany: string = this.data.company;
  enteredPosition: string = this.data.position;
  enteredType: string = this.data.jobType.name;
  enteredCity: string = this.data.location.slice(0, this.data.location.length-4);
  enteredState: string = this.data.location.slice(this.data.location.length-2,this.data.location.length);
  enteredMinPay: string = this.data.minPay;
  enteredMaxPay: string = this.data.maxPay;
  enteredLinkToCompanySite: string = ((this.data.linkToCompanySite != null) ? this.data.linkToCompanySite : '');
  enteredLinkToJobPost?: string = ((this.data.linkToJobPost != null) ? this.data.linkToJobPost : '');
  enteredDescriptionOfJob: string = this.data.description;
  enteredClosedReason?: string = this.data.closedReason?.name;
  enteredDateApplied: string = this.data.dateApplied;
  enteredDateClosed: string = (this.data.closedReason) ? this.dateClosedDate!.toISOString() : '';

  toggleApplicationClosed(event: Event) {
    this.applicationClosed = (event.target as HTMLInputElement).checked;
  }


  onAddButtonClick(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched(); // Mark all fields as touched to trigger validation
      return;
    }
    this.editApplication(form.value);
  }

  editApplication(formData: any) {
    const edittedApp: Application = {
      id: this.id,
      company: formData.company,
      position: formData.position,
      jobType: {
        id: 0,
        name: formData.type
      },
      location: formData.city + ", " + formData.state,
      minPay: formData.minPay,
      maxPay: formData.maxPay,
      linkToCompanySite: formData.linkToCompanySite,
      linkToJobPost: formData.linkToJobPost,
      description: formData.descriptionOfJob,
      closedReason: {
        id: 0,
        name: formData.closedReason
      },
      dateApplied: this.dateApplied.value?.getFullYear() + "-" + (this.dateApplied.value!.getMonth()+1) + "-" + this.dateApplied.value?.getDate(),
      dateClosed: (formData.closed) ? this.dateClosed.value?.getFullYear() + "-" + (this.dateClosed.value!.getMonth()+1) + "-" + this.dateClosed.value?.getDate() : '0001-01-01',
    };

    // this.dateApplied.value?.getFullYear() + "-" + (this.dateApplied.value!.getMonth() + 1) + "-" + (this.dateApplied.value?.getDate()!)

    console.log(edittedApp);

    this.applicationsService.editApplication(edittedApp, this.user);

    // Perform further actions such as saving data to a service or API
    this.dialogRef.close();
  }
}

@Component({
  selector: 'delete-app-dialog',
  templateUrl: 'delete-app-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatDatepickerModule,MatDatepickerModule,ReactiveFormsModule,MatCheckboxModule, FormsModule],
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS},
  ],
})
export class DeleteAppDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: number, public dialogRef: MatDialogRef<EditAppDialog>, private applicationsService: ApplicationsService, private userService: UserService) {}

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

  onDelButtonClick() {
    // remove application
    this.applicationsService.deleteApplicationById(this.data, this.user)
    this.dialogRef.close();
  }
}


