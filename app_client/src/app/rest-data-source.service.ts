import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product, ProductDto} from './product-model';
import {map} from 'rxjs/operators';

const PROTOCOL = 'http';
const PORT = 5000;

@Injectable({
    providedIn: 'root'
})
export class RestDataSourceService {

    private baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/api/`;

    constructor(private http: HttpClient) {
    }

    addProduct(newProduct: Product): Observable<Product> {
        return this.http.post<Product>(`${this.baseUrl}product`, newProduct).pipe(map((responseObject: ProductDto) => new Product(responseObject.name, responseObject.description, responseObject.category, responseObject.price, responseObject._id)));
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}product`).pipe(map((products: ProductDto[]) => {
            return products.map(product => new Product(product.name, product.description, product.category, product.price, product._id));
        }));
    }

    updateProduct(product: Product): Observable<Product> {
        return this.http.patch<Product>(`${this.baseUrl}product/${product.id}`, product).pipe(map((responseObject: ProductDto) => new Product(responseObject.name, responseObject.description, responseObject.category, responseObject.price, responseObject._id)));
    }

    deleteProduct(product: Product): Observable<{ isDeleted: boolean, message: string }> {
        return this.http.delete<{ isDeleted: boolean, message: string }>(`${this.baseUrl}product/${product.id}`);
    }

}
