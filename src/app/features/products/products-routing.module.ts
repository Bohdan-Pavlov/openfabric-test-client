import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MAIN_PAGE_ROUTE } from 'src/app/app.constants';
import { ProductsComponent } from 'src/app/features/products/products.component';

const routes: Routes = [
	{
		path: MAIN_PAGE_ROUTE,
		component: ProductsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProductsRoutingModule {}
