import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NavbarComponent } from './navbar/navbar.component';
import { OngoingSectionComponent } from './ongoing-section/ongoing-section.component';
import { MatDivider } from '@angular/material/divider';
import { ClosedSectionComponent } from "./closed-section/closed-section.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, OngoingSectionComponent, MatDivider, ClosedSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'application-tracker';
}
