import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidSession());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private apiUrl = 'http://localhost:8080/auth'; // Backend API URL

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

  // Other AuthService methods for session handling...
  loginWithToken(token: string, returnUrl: string = '/portfolio'): void {
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true);
    this.router.navigate([returnUrl]);
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('sessionTimestamp');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  hasValidSession(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const sessionTimestamp = localStorage.getItem('sessionTimestamp');

    if (!isLoggedIn || !sessionTimestamp) {
      return false;
    }

    // Session expires after 30 minutes
    const sessionAge = Date.now() - parseInt(sessionTimestamp);
    return sessionAge < 30 * 60 * 1000;
  }

  private checkSession(): void {
    setInterval(() => {
      if (!this.hasValidSession()) {
        this.logout();
      }
    }, 60 * 1000); // Check every minute
  }
}
