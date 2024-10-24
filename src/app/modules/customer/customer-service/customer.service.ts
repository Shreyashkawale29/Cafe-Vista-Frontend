import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth-services/strorage-service/storage.service';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  [x: string]: any;

  constructor(private http: HttpClient, private service:StorageService) {}

  getAllCategory(): Observable<any> {
    const url = `${BASIC_URL}/api/customer/categories`;
    console.log('Fetching categories from:', url); // Log the URL
    return this.http.get(url, {
        headers: this.createAuthorizationHeader(),
    });
}


getCategoriesByName(title: string): Observable<any> {
    return this.http.get(BASIC_URL + `/api/customer/categories/${title}`, {
        headers: this.createAuthorizationHeader(),
    });
}

  //Porduct Operations
  getProductsByCategory(categoryId:number): Observable<any> {
    return this.http.get(BASIC_URL + `/api/customer/${categoryId}/products`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getProductsByCategoryAndTitle(categoryId:number,title: String): Observable<any> {
    return this.http.get(BASIC_URL + `/api/customer/${categoryId}/product/${title}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createAuthorizationHeader(): HttpHeaders {
    const token = this.service.getToken();
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      console.error('No token found');
      throw new Error('No token found');
    }
  }
  


  //Reservation Operation 
  
  postReservation(reservationDto:any): Observable<any> {
    reservationDto.customerId = this.service.getUserId();
    return this.http.post(BASIC_URL + `/api/customer/reservation`,reservationDto, {
      headers: this.createAuthorizationHeader(),
    });
  }


  getReservationsByUser(): Observable<any> {
    return this.http.get(BASIC_URL + `/api/customer/reservations/${this.service.getUserId()}`, {
      headers: this.createAuthorizationHeader(),
    });
  }
}
