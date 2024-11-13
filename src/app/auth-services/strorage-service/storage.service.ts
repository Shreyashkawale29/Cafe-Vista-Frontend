import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // BehaviorSubjects to track login states
  private adminLoggedInSubject = new BehaviorSubject<boolean>(this.isAdminLoggedIn());
  private customerLoggedInSubject = new BehaviorSubject<boolean>(this.isCustomerLoggedIn());

  // Expose the current login state as observables
  adminLoggedIn$ = this.adminLoggedInSubject.asObservable();
  customerLoggedIn$ = this.customerLoggedInSubject.asObservable();

  constructor() {}

  getUserId(): string {
    const user = this.getUser();
    return user ? user.id : ''; // Return empty string if user is null
  }

  saveToken(token: string){
    window.localStorage.setItem(TOKEN, token);
    this.updateLoginState(); 
 }


  saveUser(user: any) {
    window.localStorage.setItem(USER, JSON.stringify(user));
    this.updateLoginState(); 
  }

  getToken(): string | null { 
    return localStorage.getItem(TOKEN);
  }

  getUser(): any {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null; 
  }

  getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : ''; 
  }

  isAdminLoggedIn(): boolean {
    const token = this.getToken();
    const role: string = this.getUserRole();
    return token !== null && role === 'ADMIN';
  }

  isCustomerLoggedIn(): boolean {
    const token = this.getToken();
    const role: string = this.getUserRole();
    return token !== null && role === 'CUSTOMER';
  }

  signout(): void {
    window.localStorage.removeItem(USER);
    window.localStorage.removeItem(TOKEN);
    this.updateLoginState(); 
  }

  private updateLoginState() {
    
    this.adminLoggedInSubject.next(this.isAdminLoggedIn());
    this.customerLoggedInSubject.next(this.isCustomerLoggedIn());
  }

  
}
