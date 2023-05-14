import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MAIN_PAGE_ROUTE, NOT_FOUND_ROUTE } from 'src/app/app.constants';

const routes: Routes = [
	// {
	// 	path: MAIN_PAGE_ROUTE,
	// 	loadChildren: () =>
	// 		import('./features/products/products.module').then(m => m.ProductsModule),
	// },
	// {
	// 	path: NOT_FOUND_ROUTE,
	// 	redirectTo: '',
	// },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
