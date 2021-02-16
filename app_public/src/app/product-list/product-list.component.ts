import {Component, OnInit} from '@angular/core';

import {ProductRepositoryService} from '../product-repository.service';
import {Product} from '../product-model';

@Component({
    selector: 'app-product-list',
    template: `
        <div class="d-flex justify-content-between mb-3">
            <h1 class="h3">Product List</h1>
            <a class="btn btn-primary" routerLink="/add-product">
                <i class="fas fa-plus"></i>
                <span class="ms-2">Add new product</span>
            </a>
        </div>

        <table class="table table-bordered bg-white">
            <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let product of productList; let i = index">
                <td>{{i + 1}}</td>
                <td>{{product.name}}</td>
                <td>{{product.description}}</td>
                <td>{{product.category}}</td>
                <td>{{product.price | currency}}</td>
                <td class="d-flex justify-content-around">
                    <a [routerLink]="['edit-product', product.id]">
                        <i class="fas fa-pen"></i>
                    </a>
                    <a routerLink="/" (click)="deleteProduct(product)">
                        <i class="fas fa-trash text-danger"></i>
                    </a>
                </td>
            </tr>
            <tr *ngIf="productList.length === 0">
                <td colspan="4">Catalog is empty</td>
            </tr>
            </tbody>
        </table>
    `,
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

    productList: Product[] = [];

    constructor(private productRepository: ProductRepositoryService) {
    }

    ngOnInit(): void {
        this.productList = this.productRepository.getProductList();
    }

    deleteProduct(product: Product): void {
        this.productRepository.delete(product);
    }

}
