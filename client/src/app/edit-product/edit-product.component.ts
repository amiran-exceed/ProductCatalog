import {Component, OnInit} from '@angular/core';

import {ProductRepositoryService} from '../product-repository.service';
import {Product} from '../product-model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

    product: Product = {
        name: '',
        description: '',
        category: '',
        price: null
    };

    constructor(private productRepository: ProductRepositoryService, private activatedRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.product = {...this.productRepository.getProduct(params.id)};
        });
    }

    updateProduct(): void {
        this.productRepository.update(this.product);
        this.router.navigateByUrl('/').then(null);
    }

}
