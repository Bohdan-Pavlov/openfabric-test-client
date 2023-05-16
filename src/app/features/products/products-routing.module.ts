import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MAIN_PAGE_ROUTE, PRODUCT_DETAILS_ROUTE } from 'src/app/app.constants';
import { ProductDetailsComponent } from 'src/app/features/products/components/product-details/product-details.component';
import { ProductsComponent } from 'src/app/features/products/products.component';

const routes: Routes = [
	{
		path: MAIN_PAGE_ROUTE,
		component: ProductsComponent,
	},

	{
		path: PRODUCT_DETAILS_ROUTE,
		component: ProductDetailsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProductsRoutingModule {}
