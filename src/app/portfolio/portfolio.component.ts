import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { PortfolioService } from '../dashboard/portfolio.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <h2>Your Portfolio</h2>
      
      <!-- Gold Investment Details -->
      <div class="card mt-3">
        <div class="card-body">
          <h5 class="card-title">Gold Investment</h5>
          <p>Amount Invested: {{ goldInvestment | currency }}</p>
          <p>Gold Price: {{ holdings[0].currentPrice | currency }} per oz</p>
        </div>
      </div>
      
      <!-- Other Portfolio Data -->
      <!-- ... (Rest of the portfolio template) ... -->
    </div>
  `
})
export class PortfolioComponent implements OnInit {
  goldInvestment: number = 0;
  portfolioValue: number = 125750;
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

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.goldInvestment = this.portfolioService.getGoldInvestment();
  }
}
