import {TestBed, fakeAsync, tick} from '@angular/core/testing';

import {ProductListComponent} from './product-list.component';
import {ProductRepositoryService} from '../product-repository.service';
import {Product} from '../product-model';

describe('ProductListComponent tests', () => {

    const ProductRepositoryServiceStub = {
        productList: [],

        getProductList: function () {
            this.productList.push({
                    id: 1,
                    name: 'Kayak',
                    category: 'Water sports',
                    description: 'A boat for one person',
                    price: 275,
                },
                {
                    id: 2,
                    name: 'Life jacket',
                    category: 'Water sports',
                    description: 'Protective and fashionable',
                    price: 48.95,
                });
            return this.productList;
        },

        delete: function (product: Product) {
            const index = this.productList.findIndex((p: Product) => p.id === product.id);
            this.productList.splice(index, 1);
            return {isDeleted: true, message: 'Product has been deleted successfully'};
        }
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductListComponent],
            providers: [{provide: ProductRepositoryService, useValue: ProductRepositoryServiceStub}]
        }).compileComponents();
    });

    it('should create the ProductListComponent', () => {
        const fixture = TestBed.createComponent(ProductListComponent);
        const productListComponent = fixture.componentInstance;
        expect(productListComponent).toBeTruthy();
    });

    it('should load product list it there is data in the database', fakeAsync(() => {
        const fixture = TestBed.createComponent(ProductListComponent);
        const productListComponent = fixture.componentInstance;
        productListComponent.ngOnInit();
        fixture.detectChanges();
        expect(productListComponent.productList.length).toBeGreaterThan(0);
    }));

    it('should delete product in the database', fakeAsync(() => {
        const fixture = TestBed.createComponent(ProductListComponent);
        const productListComponent = fixture.componentInstance;
        productListComponent.ngOnInit();
        productListComponent.deleteProduct({
            id: 1,
            name: 'Kayak',
            category: 'Water sports',
            description: 'A boat for one person',
            price: 275,
        });
        fixture.detectChanges();
        expect(productListComponent.productList.length).toBeTruthy(1);
        expect(productListComponent.productList[0].id).not.toBe(1);
    }));

});
