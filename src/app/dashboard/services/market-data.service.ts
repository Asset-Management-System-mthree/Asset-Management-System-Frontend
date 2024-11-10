import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {
  constructor(private http: HttpClient) {}

  getGoldData(): Observable<any> {
    // Simulated gold data as we don't have actual API access
    return of({
      currentPrice: 1875.30,
      priceChange: 0.75,
      prediction: 1882.45
    });
  }

  getStockData(symbol: string): Observable<any> {
    // Simulated stock data as Yahoo Finance API requires authentication
    return of({
      currentPrice: this.getRandomPrice(100, 500),
      priceChange: this.getRandomPrice(-5, 5),
      open: this.getRandomPrice(100, 500),
      close: this.getRandomPrice(100, 500),
      high: this.getRandomPrice(100, 500),
      low: this.getRandomPrice(100, 500),
      volume: Math.floor(Math.random() * 1000000)
    });
  }

  private getRandomPrice(min: number, max: number): number {
    return +(Math.random() * (max - min) + min).toFixed(2);
  }
}