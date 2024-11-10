import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarketDataService } from '../services/market-data.service';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid">
      <h2>Stock Market</h2>

      <div class="row mt-4">
        <div class="col-md-6">
          <div class="form-group">
            <label for="companySelect">Select Company</label>
            <select 
              class="form-control" 
              id="companySelect" 
              [(ngModel)]="selectedCompany"
              (change)="onCompanyChange()">
              <option value="">Choose a company...</option>
              <option *ngFor="let company of companies" [value]="company.symbol">
                {{company.name}}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="row mt-4" *ngIf="stockData">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Current Stock Price</h5>
              <h2 class="text-primary">\${{stockData.currentPrice}}</h2>
              <div class="mt-3">
                <span [class]="stockData.priceChange >= 0 ? 'text-success' : 'text-danger'">
                  {{stockData.priceChange >= 0 ? '↑' : '↓'}} 
                  {{Math.abs(stockData.priceChange)}}%
                </span>
                <small class="text-muted ms-2">Today's Change</small>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Market Stats</h5>
              <div class="row">
                <div class="col-6">
                  <p class="mb-1">Open</p>
                  <h6>\${{stockData.open}}</h6>
                </div>
                <div class="col-6">
                  <p class="mb-1">Close</p>
                  <h6>\${{stockData.close}}</h6>
                </div>
                <div class="col-6">
                  <p class="mb-1">High</p>
                  <h6>\${{stockData.high}}</h6>
                </div>
                <div class="col-6">
                  <p class="mb-1">Low</p>
                  <h6>\${{stockData.low}}</h6>
                </div>
                <div class="col-6">
                  <p class="mb-1">Volume</p>
                  <h6>{{stockData.volume}}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class StocksComponent implements OnInit {
  companies = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'META', name: 'Meta Platforms Inc.' }
  ];

  selectedCompany = '';
  stockData: any = null;
  Math = Math;

  constructor(private marketService: MarketDataService) {}

  ngOnInit() {}

  onCompanyChange() {
    if (this.selectedCompany) {
      this.marketService.getStockData(this.selectedCompany).subscribe(data => {
        this.stockData = data;
      });
    }
  }
}