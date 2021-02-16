import {Component, OnInit} from '@angular/core';

import {ProductRepositoryService} from '../product-repository.service';
import {Product} from '../product-model';
import {NgForm} from '@angular/forms';
import {NotificationsService} from '../notifications.service';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

    newProduct: Product = {
        name: '',
        description: '',
        category: '',
        price: null
    };

    constructor(private productRepository: ProductRepositoryService, public notificationService: NotificationsService) {
    }

    ngOnInit(): void {
    }

    addNewProduct(form: NgForm): void {
        this.productRepository.add(this.newProduct);
        form.reset();
    }

}
