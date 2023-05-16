import { Component, Input } from '@angular/core';

import { ProductsService } from 'src/app/features/products/services/products.service';

@Component({
	selector: 'app-delete-button',
	templateUrl: './delete-button.component.html',
	styleUrls: ['./delete-button.component.scss'],
})
export class DeleteButtonComponent {
	@Input() productId = '';

	constructor(private productsService: ProductsService) {}

	public onDeleteProduct(): void {
		const confirmedDelete = confirm('Are you sure you want to delete this product?');
		if (confirmedDelete) {
			return this.productsService.deleteProduct(this.productId);
		}
	}
}
