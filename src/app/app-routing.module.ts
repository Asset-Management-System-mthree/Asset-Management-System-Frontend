import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import { SignupComponent } from './signup/signup.component';
import { PortfolioComponent } from './portfolio/portfolio.component'; // Adjust this import according to your actual path
import { AuthGuard } from './guards/auth.guard';
import {BitcoinComponent} from "./dashboard/bitcoin/bitcoin.component";
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';  // Import MatSnackBarModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Import BrowserAnimationsModule

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {path:'home',component:HomeComponent},
    {path:'bitcoin',component:BitcoinComponent,canActivate:[AuthGuard]},
    {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
    { path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },  // Redirect to login if no route matches
];

@NgModule({
    imports: [RouterModule.forRoot(routes),BrowserAnimationsModule,MatSnackBarModule,BrowserModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
