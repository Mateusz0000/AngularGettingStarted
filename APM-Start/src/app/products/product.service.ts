import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IProduct } from './product';
import {catchError, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl: string = "api/products/products.json"

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.apiUrl)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessgae: string = '';

    if(err.error instanceof ErrorEvent){
      errorMessgae = `An error occured: ${err.error.message}`;
    }
    else{
      errorMessgae = `Server returned code: ${err.status}, error message is: ${err.message}`
    }

    console.log(errorMessgae);
    
    return throwError(errorMessgae);
  }
}
