import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container mt-4">
            <!-- Hero Section -->
            <div class="hero-section text-center mb-5 p-4 text-white"
                 style="background: linear-gradient(to bottom right, #003973, #7f8c8d); border-radius: 15px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
                <img src="assets/hero-image.jpg" alt="Asset Management" class="img-fluid mb-4"
                     style="max-height: 250px; border-radius: 10px;">
                <h1 class="display-4 fw-bold">Welcome to Asset Management</h1>
                <p class="lead">Your trusted partner in wealth management and financial growth</p>
            </div>

            <!-- News Carousel -->
            <div id="news-carousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div class="carousel-inner">
                    <!-- Display only 10 items and filter out those without imageUrl -->
                    <div class="carousel-item" *ngFor="let news of (newsItems | slice:0:10); let i = index"
                         [ngClass]="{'active': i === 0}">
                        <img [src]="news.imageUrl" alt="News Image"
                             class="d-block w-100"
                             style="max-height: 600px; width: 100%; object-fit: cover; border-radius: 10px;">
                        <div class="carousel-caption d-none d-md-block"
                             style="position: absolute; top: 20px; left: 20px; text-align: left; color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">
                            <h5>{{ news.title }}</h5>
                            <p>{{ news.summary }}</p>
                        </div>
                    </div>
                </div>

                <!-- Carousel Controls -->
                <button class="carousel-control-prev" type="button" data-bs-target="#news-carousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#news-carousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <!-- Current Prices Section -->
            <div class="prices-section mb-5">
                <h2 class="text-center mb-4" style="font-family: 'Roboto', sans-serif; font-weight: 700;">Current Prices</h2>
                <div class="row text-center">
                    <div class="col-md-3 mb-4" *ngFor="let asset of assetPrices">
                        <div class="card shadow-lg border-0 rounded-lg"
                             style="background: #f8f9fa; transition: transform 0.3s ease-in-out;">
                            <div class="card-body" style="padding: 30px;">
                                <h5 class="card-title fw-bold text-primary">{{ asset.name }}</h5>
                                <p class="card-text fs-5">
                                    <ng-container *ngIf="asset.name === 'Gold' || asset.name === 'Bitcoin'">
                                        💰 Price: {{ asset.price | currency:'USD' }}
                                    </ng-container>
                                    <ng-container *ngIf="asset.name !== 'Gold' && asset.name !== 'Bitcoin'">
                                        {{ asset.price }}
                                    </ng-container>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Our Services Section -->
            <div class="features-section mb-5">
                <h2 class="text-center mb-4" style="font-family: 'Roboto', sans-serif; font-weight: 700;">Our Services</h2>
                <div class="row">
                    <div class="col-md-4 mb-4" *ngFor="let service of services">
                        <div class="card shadow-lg border-0 h-100 rounded-lg" style="background: #f1f3f5; transition: transform 0.3s ease-in-out;">
                            <div class="card-body text-center" style="padding: 30px;">
                                <h5 class="card-title fw-bold text-primary">{{ service.title }}</h5>
                                <p class="card-text">{{ service.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    `
})
export class HomeComponent implements OnInit {
    newsItems: any[] = [];
    assetPrices: { name: string, price: number | null }[] = [
        { name: 'Gold', price: null },
        { name: 'Bitcoin', price: null },
        { name: 'NYSE Composite', price: null },
        { name: 'Nifty 50', price: null }
    ];

    services = [
        { title: 'Portfolio Management', description: 'Expert management of your investment portfolio with personalized strategies.' },
        { title: 'Market Analysis', description: 'In-depth market analysis and research to inform your investment decisions.' },
        { title: 'Wealth Planning', description: 'Comprehensive wealth planning services for your financial future.' }
    ];

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.fetchNews();
        this.fetchAssetPrices();
    }

    fetchNews() {
        this.http.get<any[]>('http://localhost:8080/api/news/financial').subscribe(
            (data) => {
                // Ensure data is an array and has the expected structure
                if (Array.isArray(data)) {
                    this.newsItems = data.filter(item => item.imageUrl);  // Filter out items without `imageUrl`
                }
            },
            (error) => {
                console.error('Error fetching news:', error);
            }
        );
    }

    fetchAssetPrices() {
        const apiEndpoints = {
            gold: 'https://api.gold-api.com/price/XAU',
            bitcoin: 'https://api.gold-api.com/price/BTC',
            nyse: 'http://localhost:8080/api/nyse',
            nifty: 'http://localhost:8080/api/nifty'
        };

        this.http.get<any>(apiEndpoints.gold).subscribe(data => {
            this.assetPrices[0].price = data.price;
        });

        this.http.get<any>(apiEndpoints.bitcoin).subscribe(data => {
            this.assetPrices[1].price = data.price;
        });

        this.http.get<any>(apiEndpoints.nyse).subscribe(data => {
            if (data && data.chart && data.chart.result) {
                const nyseData = data.chart.result[0];
                this.assetPrices[2].price = nyseData.meta.regularMarketPrice || nyseData.meta.previousClose;
            }
        });

        this.http.get<any>(apiEndpoints.nifty).subscribe(data => {
            if (data && data.chart && data.chart.result) {
                const niftyData = data.chart.result[0];
                this.assetPrices[3].price = niftyData.meta.regularMarketPrice || niftyData.meta.previousClose;
            }
        });
    }
}
