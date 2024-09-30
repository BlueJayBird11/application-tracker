import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NavbarComponent } from './navbar/navbar.component';
import { OngoingSectionComponent } from './ongoing-section/ongoing-section.component';
import { MatDivider } from '@angular/material/divider';
import { ClosedSectionComponent } from "./closed-section/closed-section.component";
import { StatisticsComponent } from './statistics/statistics.component';
import { ApplicationsService } from './shared/application/applications.service';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, OngoingSectionComponent, MatDivider, ClosedSectionComponent, StatisticsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'application-tracker';
  isLoggedIn: boolean = false;

  constructor(private applicationsService: ApplicationsService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.loggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if (!this.isLoggedIn) {
        this.applicationsService.useDefaultData();
      } else {
        this.applicationsService.retrieveApplications(this.userService.user.id);
      }
    });
  }

  // isLoggedIn = this.userService.isLoggedIn();

}
