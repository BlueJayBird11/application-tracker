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

// animal: 'panda' | 'unicorn' | 'lion';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, SharedModule, MatIconModule, MatMenuModule],
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: Application, public dialogRef: MatDialogRef<EditAppDialog>, private applicationsService: ApplicationsService) {}

  readonly dateApplied = new FormControl(new Date());
  readonly dateClosed = new FormControl(new Date());
  applicationClosed: boolean = this.data.closed;

  id: number = this.data.id;

  enteredCompany: string = this.data.company;
  enteredPosition: string = this.data.position;
  enteredType: string = this.data.type;
  enteredCity: string = this.data.location.slice(0, this.data.location.length-4);
  enteredState: string = this.data.location.slice(this.data.location.length-2,this.data.location.length);
  enteredMinPay: string = this.data.minPay;
  enteredMaxPay: string = this.data.maxPay;
  enteredLinkToCompanySite: string = this.data.linkToCompanySite;
  enteredLinkToJobPost?: string = this.data.linkToJobPost;
  enteredDescriptionOfJob: string = this.data.descriptionOfJob;
  enteredClosedReason?: string = this.data.closedReason;
  enteredDateApplied: string = this.data.dateApplied;
  enteredClosedDate: string | undefined = (this.data.dateClosed !== undefined) ? this.data.dateClosed : undefined;

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
      type: formData.type,
      location: formData.city + ", " + formData.state,
      minPay: formData.minPay,
      maxPay: formData.maxPay,
      linkToCompanySite: formData.linkToCompanySite,
      linkToJobPost: (formData.linkToJobPost !== "") ? formData.linkToJobPost : undefined,
      descriptionOfJob: formData.descriptionOfJob,
      closed: formData.closed,
      closedReason: formData.closedReason,
      dateApplied: this.dateApplied.value?.getFullYear() + "-" + (this.dateApplied.value!.getMonth() + 1) + "-" + this.dateApplied.value?.getDate(),
      dateClosed: (formData.closed) ? this.dateClosed.value?.getFullYear() + "-" + (this.dateClosed.value!.getMonth() + 1) + "-" + this.dateClosed.value?.getDate() : undefined,
    };

    console.log(edittedApp);

    this.applicationsService.editApplication(edittedApp);

    // Perform further actions such as saving data to a service or API
    this.dialogRef.close();
  }
}


