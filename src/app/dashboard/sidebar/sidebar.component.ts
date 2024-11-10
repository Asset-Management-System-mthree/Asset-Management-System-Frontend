import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="sidebar bg-dark text-light p-3 h-100">
      <h5 class="mb-4">Assets</h5>
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link text-light" 
             routerLink="gold" 
             routerLinkActive="active">Gold</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-light" 
             routerLink="stocks" 
             routerLinkActive="active">Stocks</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-light" 
             routerLink="crypto" 
             routerLinkActive="active">Crypto</a>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .sidebar {
      min-height: 100%;
    }
    .nav-link.active {
      background-color: rgba(255,255,255,0.1);
      border-radius: 4px;
    }
  `]
})
export class SidebarComponent {}