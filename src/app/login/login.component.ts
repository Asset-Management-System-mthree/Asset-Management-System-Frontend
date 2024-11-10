import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';  // Import Router
import { MatSnackBar } from '@angular/material/snack-bar';  // Import MatSnackBar for notifications

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h2 class="text-center mb-4">Login</h2>
              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="email" formControlName="email">
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" formControlName="password">
                </div>
                <button type="submit" class="btn btn-primary w-100" [disabled]="!loginForm.valid">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  //styleUrls: ['./login.component.css']  // Link to component-specific stylesheet
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router, // Inject Router
    private snackBar: MatSnackBar  // Inject MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          // Show success notification
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000,
            panelClass: ['green-snackbar'],  // Custom green snackbar class
            verticalPosition: 'top',         // Position at the top
            horizontalPosition: 'right'      // Position at the right
          });
          // Redirect to portfolio page after successful login
          this.authService.loginWithToken(response.token, '/portfolio');
        },
        error: (error) => {
          console.error('Login error', error);
          // Show error notification
          this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
            duration: 3000,
            panelClass: ['red-snackbar'],  // Custom red snackbar class
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      });
    }
  }
}

