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
} from '@angular/material/dialog';

import { SharedModule } from '../shared.module';
import { type Application } from './application.model';

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


