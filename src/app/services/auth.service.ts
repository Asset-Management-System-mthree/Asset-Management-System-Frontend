import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // Backend API URL
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidSession());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkSession();
  }

  // Signup method
  signup(fullName: string, email: string, password: string) {
    const user = { fullName, email, password };
    return this.http.post<any>(`${this.apiUrl}/signup`, user).pipe(
        catchError((error) => {
          console.error('Signup error', error);
          throw error; // Propagate the error
        })
    );
  }

  // Login method
  login(email: string, password: string) {
    const credentials = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
        catchError((error) => {
          console.error('Login error', error);
          throw error; // Propagate the error
        })
    );
  }

  // Handle login with token after backend authentication
  loginWithToken(token: string, returnUrl: string = '/portfolio'): void {
    localStorage.setItem('token', token);  // Store token in localStorage
    this.isAuthenticatedSubject.next(true);
    this.router.navigate([returnUrl]);
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('token');  // Remove token from localStorage
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  // Check if session is valid (whether the user is logged in)
  hasValidSession(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;  // If there's a token, the user is logged in
  }

  // Periodically check if the session is valid
  private checkSession(): void {
    setInterval(() => {
      if (!this.hasValidSession()) {
        this.logout();
      }
    }, 60 * 1000); // Check session every minute
  }
}
