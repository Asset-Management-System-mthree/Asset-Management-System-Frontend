import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PortfolioComponent } from './portfolio/portfolio.component'; // Adjust this import according to your actual path
import { AuthGuard } from './guards/auth.guard';

import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';  // Import MatSnackBarModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Import BrowserAnimationsModule

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuard] },
    //{ path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect to login if no route matches
];

@NgModule({
    imports: [RouterModule.forRoot(routes),BrowserAnimationsModule,MatSnackBarModule,BrowserModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
