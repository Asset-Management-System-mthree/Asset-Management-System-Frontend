import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PortfolioService } from '../portfolio.service';// Import the PortfolioService
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-gold',
    standalone: true,
    imports: [CommonModule, FormsModule],  // Import FormsModule
    template: `
    <div class="container-fluid">
      <h2>Gold Market</h2>

      <!-- Investment Input Field -->
      <div class="mt-3">
        <label for="investment">Enter Investment Amount (USD):</label>
        <input type="number" [(ngModel)]="investmentAmount" class="form-control" placeholder="Enter amount">
        <button class="btn btn-primary mt-2" (click)="saveInvestment()">Invest</button>
      </div>

      <!-- Display Gold Price and Prediction -->
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
    </div>
  `
})
export class GoldComponent implements OnInit {
    investmentAmount: number = 0;
    goldData = {
        currentPrice: 0,
        priceChange: 0,
        prediction: 0
    };

    constructor(private http: HttpClient, private portfolioService: PortfolioService) {}

    ngOnInit() {
        this.fetchCurrentGoldPrice();
        this.fetchPredictedGoldPrice();
    }

    fetchCurrentGoldPrice() {
        this.http.get<any>(`${environment.goldUrl}`).subscribe(
            (data) => {
                this.goldData.currentPrice = data.price;
                this.goldData.priceChange = data.change_24h || 0;
            },
            (error) => {
                console.error('Error fetching gold data', error);
            }
        );
    }

    fetchPredictedGoldPrice() {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        this.http.get<any>(`${environment.backendUrl}/gold-prediction`, { headers }).subscribe(
            (data) => {
                this.goldData.prediction = data.predicted_price;
            },
            (error) => {
                console.error('Error fetching predicted gold price', error);
            }
        );
    }

    saveInvestment() {
        this.portfolioService.setGoldInvestment(this.investmentAmount);
        console.log('Investment saved:', this.investmentAmount);
    }

    protected readonly Math = Math;
}
