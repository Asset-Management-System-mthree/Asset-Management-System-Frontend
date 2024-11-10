import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Your Portfolio</h2>
      
      <!-- Asset Distribution Chart -->
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Asset Distribution</h5>
              <div class="chart-container">
                <div class="pie-chart">
                  <div class="slice gold" [style.transform]="'rotate(' + 0 + 'deg)'"></div>
                  <div class="slice stocks" [style.transform]="'rotate(' + 126 + 'deg)'"></div>
                  <div class="slice crypto" [style.transform]="'rotate(' + 234 + 'deg)'"></div>
                </div>
                <div class="legend mt-3">
                  <div class="legend-item">
                    <span class="legend-color gold"></span>
                    <span>Gold (35%)</span>
                  </div>
                  <div class="legend-item">
                    <span class="legend-color stocks"></span>
                    <span>Stocks (45%)</span>
                  </div>
                  <div class="legend-item">
                    <span class="legend-color crypto"></span>
                    <span>Crypto (20%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Portfolio Value</h5>
              <h2 class="text-success">$125,750</h2>
              <div class="progress mt-3">
                <div class="progress-bar bg-success" role="progressbar" style="width: 15%">+15%</div>
              </div>
              <small class="text-muted">Total Return</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Holdings Table -->
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Your Holdings</h5>
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>Quantity</th>
                      <th>Avg. Buy Price</th>
                      <th>Current Price</th>
                      <th>Total Value</th>
                      <th>Return</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let holding of holdings">
                      <td>{{holding.asset}}</td>
                      <td>{{holding.quantity}}</td>
                      <td>{{holding.avgPrice | currency}}</td>
                      <td>{{holding.currentPrice | currency}}</td>
                      <td>{{holding.totalValue | currency}}</td>
                      <td [class]="holding.return >= 0 ? 'text-success' : 'text-danger'">
                        {{holding.return}}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chart-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .pie-chart {
      position: relative;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      overflow: hidden;
    }
    
    .slice {
      position: absolute;
      width: 100%;
      height: 100%;
      clip-path: polygon(50% 50%, 100% 0, 100% 100%);
    }
    
    .gold { background: #FFD700; }
    .stocks { background: #4CAF50; }
    .crypto { background: #2196F3; }
    
    .legend {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .legend-color {
      width: 20px;
      height: 20px;
      border-radius: 4px;
    }
    
    .legend-color.gold { background: #FFD700; }
    .legend-color.stocks { background: #4CAF50; }
    .legend-color.crypto { background: #2196F3; }
  `]
})
export class PortfolioComponent implements OnInit {
  holdings = [
    {
      asset: 'Gold',
      quantity: '10 oz',
      avgPrice: 1750,
      currentPrice: 1875.30,
      totalValue: 18753,
      return: 7.16
    },
    {
      asset: 'AAPL',
      quantity: '100',
      avgPrice: 150,
      currentPrice: 175.25,
      totalValue: 17525,
      return: 16.83
    },
    {
      asset: 'Bitcoin',
      quantity: '0.5',
      avgPrice: 45000,
      currentPrice: 48000,
      totalValue: 24000,
      return: 6.67
    }
  ];

  ngOnInit() {}
}