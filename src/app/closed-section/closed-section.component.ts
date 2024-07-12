import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';

import { ApplicationsService } from '../shared/application/applications.service';

@Component({
  selector: 'app-closed-section',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, SharedModule],
  templateUrl: './closed-section.component.html',
  styleUrl: './closed-section.component.css'
})
export class ClosedSectionComponent {
  constructor(private applicationsService: ApplicationsService) {}

  get applications() {
    return this.applicationsService.getApplications();
  }
}
