import { Component, inject } from '@angular/core';
import { MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { SharedModule } from "../shared/shared.module";

import { type Application } from './../shared/application/application.model';
import { ApplicationsService } from '../shared/application/applications.service';
import { ApplicationComponent } from '../shared/application/application.component';


@Component({
  selector: 'app-ongoing-section',
  standalone: true,
  imports: [MatButtonModule, SharedModule, ApplicationComponent, MatIcon],
  templateUrl: './ongoing-section.component.html',
  styleUrl: './ongoing-section.component.css'
})
export class OngoingSectionComponent {
  constructor(private applicationsService: ApplicationsService, public dialog: MatDialog) {}
  showAll: boolean = false;
  showAmount = 3;

  get applications(): Application[] {
    return this.applicationsService.getApplications().filter((application) => !application.closed);
  }
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
  readonly dateApplied = new FormControl(new Date());
  readonly dateClosed = new FormControl(new Date());
  applicationClosed: boolean = false;

  toggleApplicationClosed(event: Event) {
    this.applicationClosed = (event.target as HTMLInputElement).checked;
  }
}
