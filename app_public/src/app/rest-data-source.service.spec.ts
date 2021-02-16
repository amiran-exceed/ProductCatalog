import {inject, TestBed} from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RestDataSourceService} from './rest-data-source.service';
import {Product, ProductDto} from './product-model';


describe('RestDataSourceService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RestDataSourceService]
        });
    });

    it('should be created', () => {
        inject([RestDataSourceService], (restDataSourceService: RestDataSourceService) => {
            expect(restDataSourceService).toBeTruthy();
        });
    });

    describe('products', () => {
        let restDataSourceService: RestDataSourceService;
        let httpTestingController: HttpTestingController;
        let mockProductList: ProductDto[] = [];
        const apiUri = 'http://localhost:5000/api/product';

        beforeEach(() => {
            restDataSourceService = TestBed.get(RestDataSourceService);
            httpTestingController = TestBed.get(HttpTestingController);
            mockProductList = [{
                _id: 1,
                name: 'Kayak',
                category: 'Water sports',
                description: 'A boat for one person',
                price: 275,
            },
                {
                    _id: 2,
                    name: 'Life jacket',
                    category: 'Water sports',
                    description: 'Protective and fashionable',
                    price: 48.95,
                }];
        });

        it('should get a list of products if there is some products in the database', () => {
            restDataSourceService.getProducts().subscribe(products => {
                expect(products.length).toBeGreaterThan(0);
            });
            const request = httpTestingController.expectOne(apiUri);
            request.flush([...mockProductList]);
            httpTestingController.verify();
        });

        it('should get an empty array if there is no product in the database', () => {
            restDataSourceService.getProducts().subscribe(products => {
                expect(products.length).toEqual(0);
            });
            const request = httpTestingController.expectOne(apiUri);
            request.flush([]);
            httpTestingController.verify();
        });

        it('should add a new product to the database', () => {
            restDataSourceService.addProduct({
                name: 'testName',
                description: 'testDescription',
                category: 'testCategory',
                price: 100.50
            }).subscribe(product => {
                expect(product.name).toBe('testName');
            });
            const request = httpTestingController.expectOne(apiUri);
            request.flush({
                name: 'testName',
                description: 'testDescription',
                category: 'testCategory',
                price: 100.50
            });
            httpTestingController.verify();
        });

        it('should update a product in the database', () => {
            restDataSourceService.updateProduct({
                id: 1,
                name: 'testName #1',
                description: 'testDescription',
                category: 'testCategory',
                price: 100.50
            }).subscribe((product: Product) => {
                expect(product.id).toBe(1);
                expect(product.name).toBe('testName #1');
            });
            const request = httpTestingController.expectOne(`${apiUri}/1`);
            request.flush({
                _id: 1,
                name: 'testName #1',
                description: 'testDescription',
                category: 'testCategory',
                price: 100.50
            });
            httpTestingController.verify();
        });

        it('should delete a product from the database', () => {
            restDataSourceService.deleteProduct({
                id: 1,
                name: 'testName',
                description: 'testDescription',
                category: 'testCategory',
                price: 100.50
            }).subscribe((response: { isDeleted: boolean, message: string }) => {
                expect(response.isDeleted).toBeTruthy();
                expect(response.message).toBe('Product was successfully deleted');
            });
            const request = httpTestingController.expectOne(`${apiUri}/1`);
            request.flush({isDeleted: true, message: 'Product was successfully deleted'});
            httpTestingController.verify();
        });

        afterEach(() => {
            restDataSourceService = null;
            httpTestingController = null;
            mockProductList = [];
        });
    });
});
