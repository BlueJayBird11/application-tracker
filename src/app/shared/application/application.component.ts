import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { SharedModule } from '../shared.module';
import { type Application } from './application.model';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, SharedModule, MatIconModule, MatMenuModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent {
  application = input.required<Application>();
}
