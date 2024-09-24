import { Component, OnChanges, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import Chart from 'chart.js/auto';

import { ApplicationsService } from '../shared/application/applications.service';
import { Application } from '../shared/application/application.model';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit, OnChanges {
  chart: any = [];
  chart2: any = [];
  applications: Application[] = [];
  showAll: boolean = true;

  constructor(private applicationsService: ApplicationsService) {}

  ngOnInit() {
    this.applications = this.applicationsService.getApplications();
    this.initializeCharts();
  }

  ngOnChanges() {
    this.updateCharts();
  }

  toggleShow() {
    this.showAll = !this.showAll;
    this.updateCharts();
  }

  get applicationsRatio(): number[] {
    return [
      this.applications.filter((application) => !(application.dateClosed == '0001-01-01')).length,
      this.applications.filter((application) => (application.dateClosed == '0001-01-01')).length,
    ];
  }

  get closedRatio(): number[] {
    return [
      this.applications.filter((application) => application.closedReason?.name === "Not hiring").length,
      this.applications.filter((application) => application.closedReason?.name === "Position already filled").length,
      this.applications.filter((application) => application.closedReason?.name === "Looking for other people").length,
      this.applications.filter((application) => application.closedReason?.name === "Declined by self").length,
      this.applications.filter((application) => application.closedReason?.name === "Interview").length,
      this.applications.filter((application) => application.closedReason?.name === "Accepted").length,
      this.applications.filter((application) => application.closedReason?.name === "No reason given").length,
    ];
  }

  initializeCharts() {
    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: ['Ongoing', 'Closed'],
        datasets: [
          {
            label: '# of Applications',
            data: this.applicationsRatio,
            borderWidth: 1,
            backgroundColor: ['#36A2EB', '#FF6384'],
            borderColor: ['#36A2EB', '#FF6384'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });

    this.chart2 = new Chart('canvas2', {
      type: 'pie',
      data: {
        labels: [
          'Not hiring',
          'Position already filled',
          'Looking for other people',
          'Declined by self',
          'Interview stage',
          'Accepted',
          'No reason given'
        ],
        datasets: [
          {
            label: '# of Applications',
            data: this.closedRatio,
            borderWidth: 1,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0', '#9966FF', '7724AA'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0', '#9966FF', '7724AA'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  }

  updateCharts() {
    if (this.chart) {
      this.chart.data.datasets[0].data = this.applicationsRatio;
      this.chart.update();
    }
    if (this.chart2) {
      this.chart2.data.datasets[0].data = this.closedRatio;
      this.chart2.update();
    }
  }

  export(): void {
    const applications = this.applicationsService.getApplications();
    this.applicationsService.exportToCsv(applications);
  }
}
