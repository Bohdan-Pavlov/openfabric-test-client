import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
	LOGIN_PAGE_ROUTE,
	MAIN_PAGE_ROUTE,
	NOT_FOUND_ROUTE,
	REGISTER_PAGE_ROUTE,
} from 'src/app/app.constants';
import { LoginComponent } from 'src/app/features/auth/components/login/login.component';
import { RegisterComponent } from 'src/app/features/auth/components/register/register.component';
import { authGuard } from 'src/app/features/auth/guards/auth.guard';

const routes: Routes = [
	{
		path: MAIN_PAGE_ROUTE,
		loadChildren: () =>
			import('./features/products/products.module').then(m => m.ProductsModule),
	},
	{
		path: LOGIN_PAGE_ROUTE,
		component: LoginComponent,
		canActivate: [authGuard],
	},
	{
		path: REGISTER_PAGE_ROUTE,
		component: RegisterComponent,
		canActivate: [authGuard],
	},
	{
		path: NOT_FOUND_ROUTE,
		redirectTo: MAIN_PAGE_ROUTE,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
