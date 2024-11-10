import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { RouterOutlet, provideRouter, Routes } from '@angular/router';
import { NavbarComponent } from './app/navbar/navbar.component';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';
import { SignupComponent } from './app/signup/signup.component';
import { FooterComponent } from './app/footer/footer.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { GoldComponent } from './app/dashboard/gold/gold.component';
import { StocksComponent } from './app/dashboard/stocks/stocks.component';
import { PortfolioComponent } from './app/portfolio/portfolio.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthGuard } from './app/guards/auth.guard';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ChatbotComponent } from "./app/chatbot/chatbot.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuard] },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'gold', pathMatch: 'full' },
      { path: 'gold', component: GoldComponent },
      { path: 'stocks', component: StocksComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ChatbotComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-chatbot></app-chatbot>
    <app-footer></app-footer>
  `
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(), provideAnimationsAsync()
  ]
});