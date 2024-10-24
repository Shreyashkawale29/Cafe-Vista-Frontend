import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './auth-services/strorage-service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'cafe_vista';

  isAdminLoggedIn: boolean = false;
  isCustomerLoggedIn: boolean = false;

  constructor(private router: Router, private storageService: StorageService) {}

  ngOnInit() {
    // Subscribe to the login state changes
    this.storageService.adminLoggedIn$.subscribe((isAdminLoggedIn) => {
      this.isAdminLoggedIn = isAdminLoggedIn;
    });

    this.storageService.customerLoggedIn$.subscribe((isCustomerLoggedIn) => {
      this.isCustomerLoggedIn = isCustomerLoggedIn;
    });

    // Check the initial state when the component loads
    this.isAdminLoggedIn = this.storageService.isAdminLoggedIn();
    this.isCustomerLoggedIn = this.storageService.isCustomerLoggedIn();

    // Subscribe to router events to update login states
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.isAdminLoggedIn = this.storageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = this.storageService.isCustomerLoggedIn();
      }
    });
  }

  logout() {
    this.storageService.signout();
    this.router.navigateByUrl('/login');
  }
}
