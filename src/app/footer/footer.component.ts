import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-dark text-light mt-5">
      <div class="container py-4">
        <div class="row">
          <div class="col-md-4">
            <h5>About Us</h5>
            <p>Your trusted partner in asset management and financial planning.</p>
          </div>
          <div class="col-md-4">
            <h5>Contact</h5>
            <p>Email: info&#64;assetmanagement.com<br>
            Phone: (555) 123-4567</p>
          </div>
          <div class="col-md-4">
            <h5>Follow Us</h5>
            <div class="social-links">
              <a href="#" class="text-light me-3">Twitter</a>
              <a href="#" class="text-light me-3">LinkedIn</a>
              <a href="#" class="text-light">Facebook</a>
            </div>
          </div>
        </div>
        <div class="text-center mt-3">
          <p>&copy; 2024 Asset Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}