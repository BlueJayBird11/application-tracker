import { Component } from '@angular/core';

import Chart from 'chart.js/auto';

import { ApplicationsService } from '../shared/application/applications.service';
import { Application } from '../shared/application/application.model';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  constructor(private applicationsService: ApplicationsService) {}
  applications: Application[] = this.applicationsService.getApplications();

  get applicationsRatio(): number[] {
    return [this.applications.filter((application) => application.closed === false).length, this.applications.filter((application) => application.closed === true).length];
  }

  title = 'ng-chart';
  chart: any = [];

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: ['Ongoing', 'Closed'],
        datasets: [
          {
            label: '# of Votes',
            data: this.applicationsRatio,
            borderWidth: 1,
          },
        ],
      },
    });
  }

}
