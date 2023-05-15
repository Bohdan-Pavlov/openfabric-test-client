import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { IProductFromServer } from 'src/app/features/products/interfaces/products.interfaces';
import { ProductsService } from 'src/app/features/products/services/products.service';

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
	@Input() product!: IProductFromServer;

	constructor(
		private productsService: ProductsService,
		public authService: AuthService
	) {}

	public onEditProduct(): void {
		this.productsService.selectedProduct$.next(this.product);
		this.productsService.isModalOpened$.next(true);
	}
}
