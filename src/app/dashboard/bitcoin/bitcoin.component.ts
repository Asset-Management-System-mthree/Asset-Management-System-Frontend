import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-bitcoin',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container-fluid">
      <h2>Bitcoin Market</h2>

      <div class="row mt-4">
        <div class="col-md-6">
          <div class="card shadow-lg border-0 rounded-lg">
            <div class="card-body p-4">
              <h5 class="card-title">Current Bitcoin Price</h5>
              <h2 class="text-primary">\${{bitcoinData.currentPrice}}</h2>
              <p class="text-muted">Per BTC</p>
              <div class="mt-3">
                <span [class]="bitcoinData.priceChange >= 0 ? 'text-success' : 'text-danger'">
                  {{bitcoinData.priceChange >= 0 ? '↑' : '↓'}} 
                  {{Math.abs(bitcoinData.priceChange)}}%
                </span>
                <small class="text-muted ms-2">24h Change</small>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card shadow-lg border-0 rounded-lg">
            <div class="card-body p-4">
              <h5 class="card-title">Next Day Prediction</h5>
              <h3 class="text-info">\${{bitcoinData.prediction}}</h3>
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
export class BitcoinComponent implements OnInit {
    bitcoinData = {
        currentPrice: 0,
        priceChange: 0,
        prediction: 0
    };

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.fetchCurrentBitcoinPrice();
        this.fetchPredictedBitcoinPrice();
    }

    fetchCurrentBitcoinPrice() {
        this.http.get<any>(`http://localhost:8080`).subscribe(
            (data) => {
                this.bitcoinData.currentPrice = data.price;
                this.bitcoinData.priceChange = data.change_24h || 0;
            },
            (error) => {
                console.error('Error fetching Bitcoin data', error);
            }
        );
    }

    fetchPredictedBitcoinPrice() {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        this.http.get<any>(`${environment.backendUrl}/bitcoin-prediction`, { headers }).subscribe(
            (data) => {
                this.bitcoinData.prediction = data.predicted_price;
            },
            (error) => {
                console.error('Error fetching predicted Bitcoin price', error);
            }
        );
    }

    protected readonly Math = Math;
}
