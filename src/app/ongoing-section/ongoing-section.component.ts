import { Application } from './../shared/application/application.model';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ApplicationsService } from '../shared/application/applications.service';
import { SharedModule } from "../shared/shared.module";
import { ApplicationComponent } from '../shared/application/application.component';

@Component({
  selector: 'app-ongoing-section',
  standalone: true,
  imports: [MatButtonModule, SharedModule, ApplicationComponent],
  templateUrl: './ongoing-section.component.html',
  styleUrl: './ongoing-section.component.css'
})
export class OngoingSectionComponent {
  constructor(private applicationsService: ApplicationsService) {}

  get applications(): Application[] {
    return this.applicationsService.getApplications();
  }
}
