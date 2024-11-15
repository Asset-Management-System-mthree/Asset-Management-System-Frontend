import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

// MarketDataService: Retrieves stock data from the backend
class MarketDataService {
  private baseUrl = 'http://localhost:8080/api/stocks'; // Update URL as needed

  constructor(private http: HttpClient) {}

  // Helper to add JWT token to headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Get token from localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Fetch latest stock price
  getLatestStockPrice(symbol: string): Observable<any> {
    return this.http.post(
        `${this.baseUrl}/latest-price`,
        { symbol },
        { headers: this.getAuthHeaders() }
    );
  }

  // Fetch percentage changes
  getPercentageChanges(symbol: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${symbol}/percentage-changes`, {
      headers: this.getAuthHeaders()
    });
  }
}

// StocksComponent: Displays stock data
// StocksComponent: Displays stock data
@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <h2 class="text-center text-primary mb-4">Stock Market Dashboard</h2>

      <div class="row mb-4">
        <div class="col-md-6 offset-md-3">
          <div class="form-group">
            <label for="companySelect" class="h5">Select Company</label>
            <select 
              class="form-control shadow-sm" 
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

      <!-- Display stock data if available -->
      <div class="row mt-4" *ngIf="stockData">
        <!-- Stock Price Card -->
        <div class="col-md-6">
          <div class="card shadow-lg border-0 rounded-lg">
            <div class="card-body p-3">
              <h5 class="card-title text-center">Current Stock Price</h5>
              <h1 class="text-center text-primary mb-0">\${{stockData.latestPrice}}</h1>
            </div>
          </div>
        </div>

        <!-- Market Stats Card: Show Percentage Changes -->
        <div class="col-md-6" *ngIf="percentageChanges">
          <div class="card shadow-lg border-0 rounded-lg">
            <div class="card-body p-4">
              <h5 class="card-title text-center">Market Stats</h5>
              <div class="row">
                <!-- Loop over percentageChanges object to display each period's change -->
                <div class="col-6 mb-3" *ngFor="let period of percentagePeriods">
                  <p class="mb-1 text-muted text-center">{{ period }}</p>
                  <h6 class="text-center" [ngClass]="{
                    'text-success': percentageChanges[period] >= 0,
                    'text-danger': percentageChanges[period] < 0
                  }">
                    {{ percentageChanges[period] >= 0 ? '↑' : '↓' }} 
                    {{ Math.abs(percentageChanges[period]) }}%
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card-body {
      padding: 2rem;
    }
    .p-3 {
      padding: 1rem !important;
    }
    .text-primary {
      font-weight: 600;
    }
    .form-group label {
      font-weight: bold;
    }
    select.form-control {
      background-color: #f8f9fa;
    }
    .card-title {
      font-size: 1.2rem;
      color: #495057;
    }
    .mb-1 {
      font-size: 0.9rem;
    }
  `]
})
export class StocksComponent implements OnInit {
  companies = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'META', name: 'Meta Platforms Inc.' },
    { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
    { symbol: 'JNJ', name: 'Johnson & Johnson' },
    { symbol: 'V', name: 'Visa Inc.' },
    { symbol: 'PG', name: 'Procter & Gamble Co.' },
    { symbol: 'UNH', name: 'UnitedHealth Group Incorporated' },
    { symbol: 'HD', name: 'The Home Depot Inc.' },
    { symbol: 'MA', name: 'Mastercard Incorporated' },
    { symbol: 'DIS', name: 'The Walt Disney Company' },
    { symbol: 'PYPL', name: 'PayPal Holdings Inc.' },
    { symbol: 'NFLX', name: 'Netflix Inc.' },
    { symbol: 'CMCSA', name: 'Comcast Corporation' },
    { symbol: 'INTC', name: 'Intel Corporation' },
    { symbol: 'VZ', name: 'Verizon Communications Inc.' },
    { symbol: 'PEP', name: 'PepsiCo Inc.' },
    { symbol: 'ADBE', name: 'Adobe Inc.' },
    { symbol: 'T', name: 'AT&T Inc.' },
    { symbol: 'CSCO', name: 'Cisco Systems Inc.' },
    { symbol: 'XOM', name: 'Exxon Mobil Corporation' },
    { symbol: 'NKE', name: 'Nike Inc.' },
    { symbol: 'MRK', name: 'Merck & Co. Inc.' },
    { symbol: 'ABT', name: 'Abbott Laboratories' },
    { symbol: 'CRM', name: 'Salesforce Inc.' },
    { symbol: 'PFE', name: 'Pfizer Inc.' },
    { symbol: 'TMO', name: 'Thermo Fisher Scientific Inc.' },
    { symbol: 'AVGO', name: 'Broadcom Inc.' },
    { symbol: 'IBM', name: 'International Business Machines Corporation' },
    { symbol: 'WBA', name: 'Walgreens Boots Alliance Inc.' },
    { symbol: 'TXN', name: 'Texas Instruments Incorporated' },
    { symbol: 'AMGN', name: 'Amgen Inc.' },
    { symbol: 'MDLZ', name: 'Mondelez International Inc.' },
    { symbol: 'ISRG', name: 'Intuitive Surgical Inc.' },
    { symbol: 'NOW', name: 'ServiceNow Inc.' },
    { symbol: 'HON', name: 'Honeywell International Inc.' },
    { symbol: 'QCOM', name: 'Qualcomm Incorporated' },
    { symbol: 'SBUX', name: 'Starbucks Corporation' },
    { symbol: 'LRCX', name: 'Lam Research Corporation' },
    { symbol: 'GILD', name: 'Gilead Sciences Inc.' },
    { symbol: 'ATVI', name: 'Activision Blizzard Inc.' },
    { symbol: 'FISV', name: 'Fiserv Inc.' },
    { symbol: 'CSX', name: 'CSX Corporation' },
    { symbol: 'ADP', name: 'Automatic Data Processing Inc.' },
    { symbol: 'BKNG', name: 'Booking Holdings Inc.' },
    { symbol: 'SNPS', name: 'Synopsys Inc.' },
    { symbol: 'KHC', name: 'The Kraft Heinz Company' },
    { symbol: 'LNT', name: 'Alliant Energy Corporation' },
    { symbol: 'DHR', name: 'Danaher Corporation' },
    { symbol: 'BIIB', name: 'Biogen Inc.' }
  ];


  selectedCompany = '';
  stockData: any = null;
  percentageChanges: { [key: string]: number } = {}; // Store percentage changes by period
  percentagePeriods: string[] = []; // List of periods for dynamic template rendering

  private marketService: MarketDataService;

  constructor(private http: HttpClient) {
    this.marketService = new MarketDataService(this.http);
  }

  ngOnInit() {}

  onCompanyChange() {
    if (this.selectedCompany) {
      // Fetch the latest stock price
      this.marketService.getLatestStockPrice(this.selectedCompany).subscribe(data => {
        this.stockData = data;
      });

      // Fetch the percentage changes
      this.marketService.getPercentageChanges(this.selectedCompany).subscribe(changeData => {
        this.percentageChanges = changeData;
        this.percentagePeriods = Object.keys(changeData); // Extract the periods to use in the template
      });
    }
  }

  protected readonly Math = Math;
}

