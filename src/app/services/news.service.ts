import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews(): Observable<any[]> {
    // Since Yahoo Finance API requires authentication, returning mock data
    return of([
      {
        title: 'Market Update: S&P 500 Reaches New Heights',
        summary: 'The S&P 500 index reached a new all-time high today as tech stocks continue to rally.'
      },
      {
        title: 'Federal Reserve Announces Interest Rate Decision',
        summary: 'The Federal Reserve maintains current interest rates amid economic stability.'
      },
      {
        title: 'Global Markets Show Strong Performance',
        summary: 'International markets demonstrate robust growth as global economy recovers.'
      }
    ]);
  }
}