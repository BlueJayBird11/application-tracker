import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from "../shared/shared.module";
import { ApplicationComponent } from '../shared/application/application.component';
import { Application } from './../shared/application/application.model';
import { ApplicationsService } from '../shared/application/applications.service';

@Component({
  selector: 'app-ongoing-section',
  standalone: true,
  imports: [MatButtonModule, SharedModule, ApplicationComponent],
  templateUrl: './ongoing-section.component.html',
  styleUrl: './ongoing-section.component.css'
})
export class OngoingSectionComponent {
  constructor(private applicationsService: ApplicationsService) {}
  showAll: boolean = false;
  showAmount = 3;

  get applications(): Application[] {
    return this.applicationsService.getApplications();
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
