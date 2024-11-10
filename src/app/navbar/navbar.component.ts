import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" routerLink="/">Asset Management</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/portfolio">Portfolio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/market">Market</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <ng-container *ngIf="!(authService.isAuthenticated$ | async); else loggedIn">
              <li class="nav-item">
                <a class="nav-link" routerLink="/login">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/signup">Sign Up</a>
              </li>
            </ng-container>
            <ng-template #loggedIn>
              <li class="nav-item">
                <a class="nav-link" href="#" (click)="logout($event)">Logout</a>
              </li>
            </ng-template>
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
}