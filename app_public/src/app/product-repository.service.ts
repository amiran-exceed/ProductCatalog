import {Injectable} from '@angular/core';

import {Product} from './product-model';
import {RestDataSourceService} from './rest-data-source.service';
import {NotificationsService} from './notifications.service';

@Injectable({
    providedIn: 'root'
})
export class ProductRepositoryService {

    private products: Product[] = [];

    constructor(private dataSource: RestDataSourceService, private notificationsService: NotificationsService) {
        this.dataSource.getProducts().subscribe(products => {
            this.products.push(...products);
        });
    }

    getProductList(): Product[] {
        return this.products;
    }

    getProduct(id: number): Product {
        return this.products.find(product => product.id === id);
    }

    add(product: Product): void {
        this.dataSource.addProduct(product).subscribe(newProduct => {
            this.products.push(newProduct);
            this.notificationsService.addNotification({
                status: 'success',
                message: 'Product has been added successfully to the catalog'
            });
        });
    }

    update(product: Product): void {
        this.dataSource.updateProduct(product).subscribe(updatedProduct => {
            const productIndex = this.products.findIndex(p => p.id === updatedProduct.id);
            this.products.splice(productIndex, 1, updatedProduct);
        });
    }

    delete(product: Product): void {
        this.dataSource.deleteProduct(product).subscribe((response: { isDeleted: boolean, message: string }) => {
            if (response.isDeleted) {
                const productIndex = this.products.findIndex(p => p.id === product.id);
                this.products.splice(productIndex, 1);
            }
        });
    }

}
