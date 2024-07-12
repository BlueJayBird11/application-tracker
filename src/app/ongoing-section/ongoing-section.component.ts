import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ApplicationsService } from './applications.service';
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: 'app-ongoing-section',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, SharedModule],
  templateUrl: './ongoing-section.component.html',
  styleUrl: './ongoing-section.component.css'
})
export class OngoingSectionComponent {
  constructor(private applicationsService: ApplicationsService) {}

  get applications() {
    return this.applicationsService.getApplications();
  }
}
