import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';

import { ProductsService } from 'src/app/features/products/services/products.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
	constructor(
		public productsService: ProductsService,
		public authService: AuthService
	) {}

	public ngOnInit(): void {
		this.productsService.getProducts();
	}

	public openModal(): void {
		this.productsService.isModalOpened$.next(true);
	}
}
