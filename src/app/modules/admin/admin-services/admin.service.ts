import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from 'src/app/auth-services/strorage-service/storage.service';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  [x: string]: any;

  constructor(private http: HttpClient, private storageService: StorageService) {}

  // Method to create a new category
  postCategory(categoryDto: any): Observable<any> {
    const url = `${BASIC_URL}/api/admin/category`;
    return this.http.post(url, categoryDto, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Method to get all categories
  getAllCategory(): Observable<any> {
    const url = `${BASIC_URL}/api/admin/categories`;
    console.log('Fetching categories from:', url); // Log the URL
    return this.http.get(url, {
        headers: this.createAuthorizationHeader(),
    });
  }

  // Method to get categories by title
  getAllCategoriesByTitle(title: String): Observable<any> {
    return this.http.get(BASIC_URL + `/api/admin/categories/${title}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Method to post a new product
  postProduct(categoryId: number, productDto: any): Observable<any> {
    const url = `${BASIC_URL}/api/admin/${categoryId}/product`;
    return this.http.post(url, productDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError) 
    );
  }

  // Method to get products by category
  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(BASIC_URL + `/api/admin/${categoryId}/products`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Method to get products by category and title
  getProductsByCategoryAndTitle(categoryId: number, title: String): Observable<any> {
    return this.http.get(BASIC_URL + `/api/admin/${categoryId}/product/${title}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Method to delete a product
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(BASIC_URL + `/api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Method to get product by ID
  getProductById(productId: number): Observable<any> {
    return this.http.get(BASIC_URL + `/api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Method to update a product
  updateProduct(productId: number, productDto: any): Observable<any> {
    return this.http.put(BASIC_URL + `/api/admin/product/${productId}`, productDto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Method to get reservations
  getReservations(): Observable<any> {
    return this.http.get(BASIC_URL + `/api/admin/reservations`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Method to change reservation status
  changeReservationstatus(reservationId: number, status: string): Observable<any> {
    return this.http.get(BASIC_URL + `/api/admin/reservation/${reservationId}/${status}`, {
      // headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Use the injected instance of StorageService to create authorization header
  
  private createAuthorizationHeader(): HttpHeaders {
    const token = this.storageService.getToken();
    if (!token) {
        console.error('No token found');
        throw new Error('Authorization token is missing.'); // Throw an error if the token is not found
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}

  // Method to handle errors from HTTP requests
  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.error(errorMessage); // Log error to console
    return throwError(errorMessage); // Return observable with error
  }

  
  
}
