import {TestBed, inject, fakeAsync, flushMicrotasks, flush} from '@angular/core/testing';

import {ProductRepositoryService} from './product-repository.service';
import {RestDataSourceService} from './rest-data-source.service';
import {Observable, of} from 'rxjs';
import {Product} from './product-model';

class RestDataSourceServiceMock {
    getProducts = (): Observable<Product[]> => {
        return of([]);
    }

    addProduct = (product: Product): Observable<Product> => {
        return of({
            name: 'testName',
            description: 'testDescription',
            category: 'testCategory',
            price: 100.50
        });
    }

    updateProduct = (product: Product): Observable<Product> => {
        return of({
            name: 'testName #1',
            description: 'testDescription',
            category: 'testCategory',
            price: 100.50
        });
    }

    deleteProduct = (product: Product): Observable<{ isDeleted: boolean, message: string }> => {
        return of({isDeleted: true, message: 'The product has been deleted successfully'});
    }

}

describe('ProductRepositoryService', () => {

    let productList: Product[] = null;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ProductRepositoryService, {
                provide: RestDataSourceService,
                useClass: RestDataSourceServiceMock
            }]
        });
        productList = [];
    });

    it('should be created', () => {
        inject([ProductRepositoryService], (productRepositoryService: ProductRepositoryService) => {
            expect(productRepositoryService).toBeTruthy();
        });
    });

    it('should load product list or an empty array if there is no product in the database when initialized', () => {
        inject([ProductRepositoryService], (productRepositoryService: ProductRepositoryService) => {
            expect(productRepositoryService.getProductList.length).toBeGreaterThanOrEqual(0);
        });
    });

    it('should add new product to the productList', fakeAsync(inject([ProductRepositoryService, RestDataSourceService], (productRepositoryService: ProductRepositoryService, restDataSourceService: RestDataSourceServiceMock) => {
        productList = productRepositoryService.getProductList();
        spyOn(restDataSourceService, 'addProduct').and.callThrough();
        productRepositoryService.add({
            name: 'testName',
            description: 'testDescription',
            category: 'testCategory',
            price: 100.50
        });
        flushMicrotasks();
        expect(productList.length).toBe(1);
        expect(restDataSourceService.addProduct).toHaveBeenCalledWith({
            name: 'testName',
            description: 'testDescription',
            category: 'testCategory',
            price: 100.50
        });
        flush();
    })));

    it('should update a product in the productList', fakeAsync(inject([ProductRepositoryService, RestDataSourceService], (productRepositoryService: ProductRepositoryService, restDataSourceService: RestDataSourceServiceMock) => {
        productRepositoryService.add({
            id: 1,
            name: 'testName',
            description: 'testDescription',
            category: 'testCategory',
            price: 100.50
        });
        productList = productRepositoryService.getProductList();
        spyOn(restDataSourceService, 'updateProduct').and.callThrough();
        productRepositoryService.update({
            id: 1,
            name: 'testName #1',
            description: 'testDescription',
            category: 'testCategory',
            price: 100.50
        });
        flushMicrotasks();
        expect(productList.length).toBe(1);
        expect(productList[0].name).toBe('testName #1');
        expect(restDataSourceService.updateProduct).toHaveBeenCalledWith({
            id: 1,
            name: 'testName #1',
            description: 'testDescription',
            category: 'testCategory',
            price: 100.50
        });
        flush();
    })));

    it('should delete a product from the productList', fakeAsync(inject([ProductRepositoryService, RestDataSourceService], (productRepositoryService: ProductRepositoryService, restDataSourceService: RestDataSourceServiceMock) => {
        productRepositoryService.add({
            id: 1,
            name: 'testName',
            description: 'testDescription',
            category: 'testCategory',
            price: 100.50
        });
        productList = productRepositoryService.getProductList();
        spyOn(restDataSourceService, 'deleteProduct').and.callThrough();
        productRepositoryService.delete({
            id: 1,
            name: 'testName',
            description: 'testDescription',
            category: 'testCategory',
            price: 100.50
        });
        flushMicrotasks();
        expect(productList.length).toBe(0);
        expect(restDataSourceService.deleteProduct).toHaveBeenCalledWith({
            id: 1,
            name: 'testName',
            description: 'testDescription',
            category: 'testCategory',
            price: 100.50
        });
        flush();
    })));

    afterEach(() => {
        productList = null;
    });

});
