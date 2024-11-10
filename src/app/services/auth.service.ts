import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidSession());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {
    this.checkSession();
  }

  login(returnUrl: string = '/portfolio'): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('sessionTimestamp', Date.now().toString());
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