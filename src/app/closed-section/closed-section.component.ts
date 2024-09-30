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
  applications: Application[] = [];

  constructor(private applicationsService: ApplicationsService) {}
  showAll: boolean = false;
  showAmount = 3;

  ngOnInit() {
    this.applicationsService.applications$.subscribe(status => {
      this.applications = status.filter((application) => (application.closedReason));
    })
  }

  // get applications(): Application[] {
  //   return this.applicationsService.getApplications().filter((application) => (application.closedReason));
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
}
