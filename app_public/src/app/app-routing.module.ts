import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProductListComponent} from './product-list/product-list.component';
import {AddProductComponent} from './add-product/add-product.component';
import {EditProductComponent} from './edit-product/edit-product.component';

const routes: Routes = [
    {path: 'add-product', component: AddProductComponent},
    {path: 'edit-product/:id', component: EditProductComponent},
    {path: '', component: ProductListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
