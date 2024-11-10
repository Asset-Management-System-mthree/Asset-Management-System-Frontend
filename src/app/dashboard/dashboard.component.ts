import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3 col-lg-2 p-0">
          <app-sidebar></app-sidebar>
        </div>
        <div class="col-md-9 col-lg-10 p-4">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: calc(100vh - 136px);
    }
  `]
})
export class DashboardComponent {}