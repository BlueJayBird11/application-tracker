import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '../shared/shared.module';

import { type Application } from '../shared/application/application.model';
import { ApplicationsService } from '../shared/application/applications.service';
import { ApplicationComponent } from '../shared/application/application.component';

@Component({
  selector: 'app-closed-section',
  standalone: true,
  imports: [MatButtonModule, SharedModule, ApplicationComponent],
  templateUrl: './closed-section.component.html',
  styleUrl: './closed-section.component.css'
})
export class ClosedSectionComponent {
  constructor(private applicationsService: ApplicationsService) {}
  showAll: boolean = false;
  showAmount = 3;

  get applications(): Application[] {
    return this.applicationsService.getApplications().filter((application) => (application.dateClosed != '0001-01-01'));
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
}
