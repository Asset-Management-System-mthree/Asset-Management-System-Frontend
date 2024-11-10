import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';  // Import Router
import { MatSnackBar } from '@angular/material/snack-bar';  // Import MatSnackBar for notifications

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h2 class="text-center mb-4">Sign Up</h2>
              <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="name" class="form-label">Full Name</label>
                  <input type="text" class="form-control" id="name" formControlName="name">
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="email" formControlName="email">
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" formControlName="password">
                </div>
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm Password</label>
                  <input type="password" class="form-control" id="confirmPassword" formControlName="confirmPassword">
                </div>
                <button type="submit" class="btn btn-primary w-100" [disabled]="!signupForm.valid">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./signup.component.css']  // Link to component-specific stylesheet
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router, // Inject Router
    private snackBar: MatSnackBar  // Inject MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;
      this.authService.signup(name, email, password).subscribe({
        next: (response) => {
          console.log('Signup successful', response);
          // Show success notification with green color and top-right positioning
          this.snackBar.open('Signup successful!', 'Close', {
            duration: 3000,
            panelClass: ['green-snackbar'],  // Custom green snackbar class
            verticalPosition: 'top',         // Position at the top
            horizontalPosition: 'right'      // Position at the right
          });
          // Redirect to login page after successful signup
          this.router.navigate(['/login']);  // Assuming '/login' is your login route
        },
        error: (error) => {
          console.error('Signup error', error);
          // Optionally, show an error notification here
          this.snackBar.open('Signup failed. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn'], // Error color
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      });
    }
  }
}


// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';  // Import Router
// import { MatSnackBar } from '@angular/material/snack-bar';  // Import MatSnackBar for notifications

// @Component({
//   selector: 'app-signup',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   template: `
//     <div class="container mt-5">
//       <div class="row justify-content-center">
//         <div class="col-md-6">
//           <div class="card">
//             <div class="card-body">
//               <h2 class="text-center mb-4">Sign Up</h2>
//               <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
//                 <div class="mb-3">
//                   <label for="name" class="form-label">Full Name</label>
//                   <input type="text" class="form-control" id="name" formControlName="name">
//                 </div>
//                 <div class="mb-3">
//                   <label for="email" class="form-label">Email address</label>
//                   <input type="email" class="form-control" id="email" formControlName="email">
//                 </div>
//                 <div class="mb-3">
//                   <label for="password" class="form-label">Password</label>
//                   <input type="password" class="form-control" id="password" formControlName="password">
//                 </div>
//                 <div class="mb-3">
//                   <label for="confirmPassword" class="form-label">Confirm Password</label>
//                   <input type="password" class="form-control" id="confirmPassword" formControlName="confirmPassword">
//                 </div>
//                 <button type="submit" class="btn btn-primary w-100" [disabled]="!signupForm.valid">Sign Up</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   `
// })
// export class SignupComponent {
//   signupForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router, // Inject Router
//     private snackBar: MatSnackBar  // Inject MatSnackBar
//   ) {
//     this.signupForm = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', Validators.required]
//     });
//   }

//   onSubmit() {
//     if (this.signupForm.valid) {
//       const { name, email, password } = this.signupForm.value;
//       this.authService.signup(name, email, password).subscribe({
//         next: (response) => {
//           console.log('Signup successful', response);
//           // Show success notification with green color and top-right positioning
//           this.snackBar.open('Signup successful!', 'Close', {
//             duration: 3000,
//             panelClass: ['green-snackbar'],  // Use custom class for green color
//             verticalPosition: 'top',         // Position at the top
//             horizontalPosition: 'right'      // Position at the right
//           });
//           // Redirect to login page after successful signup
//           this.router.navigate(['/login']);  // Assuming '/login' is your login route
//         },
//         error: (error) => {
//           console.error('Signup error', error);
//           // Optionally, show an error notification here
//           this.snackBar.open('Signup failed. Please try again.', 'Close', {
//             duration: 3000,
//             panelClass: ['mat-toolbar', 'mat-warn'], // Error color
//             verticalPosition: 'top',
//             horizontalPosition: 'right'
//           });
//         }
//       });
//     }
//   }
// }

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';  // Import Router
// import { MatSnackBar } from '@angular/material/snack-bar';  // Import MatSnackBar for notifications

// @Component({
//   selector: 'app-signup',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   template: `
//     <div class="container mt-5">
//       <div class="row justify-content-center">
//         <div class="col-md-6">
//           <div class="card">
//             <div class="card-body">
//               <h2 class="text-center mb-4">Sign Up</h2>
//               <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
//                 <div class="mb-3">
//                   <label for="name" class="form-label">Full Name</label>
//                   <input type="text" class="form-control" id="name" formControlName="name">
//                 </div>
//                 <div class="mb-3">
//                   <label for="email" class="form-label">Email address</label>
//                   <input type="email" class="form-control" id="email" formControlName="email">
//                 </div>
//                 <div class="mb-3">
//                   <label for="password" class="form-label">Password</label>
//                   <input type="password" class="form-control" id="password" formControlName="password">
//                 </div>
//                 <div class="mb-3">
//                   <label for="confirmPassword" class="form-label">Confirm Password</label>
//                   <input type="password" class="form-control" id="confirmPassword" formControlName="confirmPassword">
//                 </div>
//                 <button type="submit" class="btn btn-primary w-100" [disabled]="!signupForm.valid">Sign Up</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   `
// })
// export class SignupComponent {
//   signupForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router, // Inject Router
//     private snackBar: MatSnackBar  // Inject MatSnackBar
//   ) {
//     this.signupForm = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', Validators.required]
//     });
//   }

//   onSubmit() {
//     if (this.signupForm.valid) {
//       const { name, email, password } = this.signupForm.value;
//       this.authService.signup(name, email, password).subscribe({
//         next: (response) => {
//           console.log('Signup successful', response);
//           // Show success notification
//           this.snackBar.open('Signup successful!', 'Close', {
//             duration: 3000,
//             panelClass: ['mat-toolbar', 'mat-primary']
//           });
//           // Redirect to login page after successful signup
//           this.router.navigate(['/login']);  // Assuming '/login' is your login route
//         },
//         error: (error) => {
//           console.error('Signup error', error);
//           // Optionally, show an error notification here
//           this.snackBar.open('Signup failed. Please try again.', 'Close', {
//             duration: 3000,
//             panelClass: ['mat-toolbar', 'mat-warn']
//           });
//         }
//       });
//     }
//   }
// }

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-signup',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   template: `
//     <div class="container mt-5">
//       <div class="row justify-content-center">
//         <div class="col-md-6">
//           <div class="card">
//             <div class="card-body">
//               <h2 class="text-center mb-4">Sign Up</h2>
//               <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
//                 <div class="mb-3">
//                   <label for="name" class="form-label">Full Name</label>
//                   <input type="text" class="form-control" id="name" formControlName="name">
//                 </div>
//                 <div class="mb-3">
//                   <label for="email" class="form-label">Email address</label>
//                   <input type="email" class="form-control" id="email" formControlName="email">
//                 </div>
//                 <div class="mb-3">
//                   <label for="password" class="form-label">Password</label>
//                   <input type="password" class="form-control" id="password" formControlName="password">
//                 </div>
//                 <div class="mb-3">
//                   <label for="confirmPassword" class="form-label">Confirm Password</label>
//                   <input type="password" class="form-control" id="confirmPassword" formControlName="confirmPassword">
//                 </div>
//                 <button type="submit" class="btn btn-primary w-100" [disabled]="!signupForm.valid">Sign Up</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   `
// })
// export class SignupComponent {
//   signupForm: FormGroup;

//   constructor(
//       private fb: FormBuilder,
//       private authService: AuthService
//   ) {
//     this.signupForm = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', Validators.required]
//     });
//   }

//   onSubmit() {
//     if (this.signupForm.valid) {
//       const { name, email, password } = this.signupForm.value;
//       this.authService.signup(name, email, password).subscribe({
//         next: (response) => {
//           console.log('Signup successful', response);
//           // Redirect or show success message
//         },
//         error: (error) => {
//           console.error('Signup error', error);
//         }
//       });
//     }
//   }
// }
