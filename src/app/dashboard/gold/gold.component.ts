import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketDataService } from '../services/market-data.service';

@Component({
  selector: 'app-gold',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid">
      <h2>Gold Market</h2>
      
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Current Gold Price</h5>
              <h2 class="text-primary">\${{goldData.currentPrice}}</h2>
              <p class="text-muted">Per Troy Ounce</p>
              <div class="mt-3">
                <span [class]="goldData.priceChange >= 0 ? 'text-success' : 'text-danger'">
                  {{goldData.priceChange >= 0 ? '↑' : '↓'}} 
                  {{Math.abs(goldData.priceChange)}}%
                </span>
                <small class="text-muted ms-2">24h Change</small>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Next Day Prediction</h5>
              <h3 class="text-info">\${{goldData.prediction}}</h3>
              <p class="text-muted">Predicted price for tomorrow</p>
              <small class="text-warning">
                *Predictions are based on historical data and market analysis
              </small>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Investment Options</h5>
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Investment Type</th>
                      <th>Minimum Investment</th>
                      <th>Risk Level</th>
                      <th>Recommended Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let option of investmentOptions">
                      <td>{{option.type}}</td>
                      <td>{{option.minInvestment}}</td>
                      <td>{{option.riskLevel}}</td>
                      <td>{{option.duration}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class GoldComponent implements OnInit {
  goldData = {
    currentPrice: 0,
    priceChange: 0,
    prediction: 0
  };

  investmentOptions = [
    {
      type: 'Physical Gold',
      minInvestment: '$500',
      riskLevel: 'Low',
      duration: '1-5 years'
    },
    {
      type: 'Gold ETFs',
      minInvestment: '$100',
      riskLevel: 'Medium',
      duration: '6 months - 2 years'
    },
    {
      type: 'Gold Futures',
      minInvestment: '$1000',
      riskLevel: 'High',
      duration: '3-6 months'
    }
  ];

  Math = Math;

  constructor(private marketService: MarketDataService) {}

  ngOnInit() {
    this.marketService.getGoldData().subscribe(data => {
      this.goldData = data;
    });
  }
}