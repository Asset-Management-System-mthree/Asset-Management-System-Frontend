import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {
    private goldInvestment: number = 0;

    setGoldInvestment(amount: number) {
        this.goldInvestment = amount;
    }

    getGoldInvestment() {
        return this.goldInvestment;
    }
}
