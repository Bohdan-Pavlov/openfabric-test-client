import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductFromServer } from 'src/app/features/products/interfaces/products.interfaces';
import { ProductsService } from 'src/app/features/products/services/products.service';

@Component({
	selector: 'app-product-modal',
	templateUrl: './product-modal.component.html',
	styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {
	@Input() selectedProduct: IProductFromServer | null = null;

	public productForm!: FormGroup;

	constructor(
		public productsService: ProductsService,
		private fb: FormBuilder
	) {}

	public ngOnInit(): void {
		this.initializeForm();
	}

	private initializeForm(): void {
		this.productForm = this.fb.group({
			name: [
				this.selectedProduct ? this.selectedProduct.name : '',
				[Validators.required, Validators.minLength(3)],
			],
			price: [
				this.selectedProduct ? this.selectedProduct.price : '',
				[Validators.required, Validators.min(0)],
			],
			description: [
				this.selectedProduct ? this.selectedProduct.description : '',
				[Validators.required, Validators.minLength(20)],
			],
			imgUrl: [
				this.selectedProduct ? this.selectedProduct.imgUrl : '',
				[Validators.required],
			],
		});
	}

	public get name() {
		return this.productForm.get('name');
	}

	public get description() {
		return this.productForm.get('description');
	}

	public get price() {
		return this.productForm.get('price');
	}

	public get imgUrl() {
		return this.productForm.get('imgUrl');
	}

	public closeModal(event: Event): void {
		if (event.target === event.currentTarget) {
			this.productsService.isModalOpened$.next(false);
			if (this.selectedProduct) {
				this.productsService.selectedProduct$.next(null);
			}
		}
	}

	public onSubmit(): void {
		this.productsService.isSubmitting$.next(true);
		const newProductData = this.productForm.value;

		if (this.selectedProduct) {
			this.productsService.updateProduct(
				newProductData,
				this.selectedProduct._id
			);
		} else {
			this.productsService.createProduct(newProductData);
		}
	}
}
