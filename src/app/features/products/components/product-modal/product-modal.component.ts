import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { IProductFromServer } from 'src/app/features/products/interfaces/products.interfaces';
import { ProductsService } from 'src/app/features/products/services/products.service';
import { getControl } from 'src/app/shared/helpers/get-control.helper';

@Component({
	selector: 'app-product-modal',
	templateUrl: './product-modal.component.html',
	styleUrls: ['./product-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductModalComponent implements OnInit {
	@Input() selectedProduct: IProductFromServer | null = null;

	public productForm!: FormGroup;
	public isSubmitting$!: BehaviorSubject<boolean>;
	public productErrorMessage$!: BehaviorSubject<string>;
	public getValidationMessage!: (errors: ValidationErrors) => string;

	constructor(private productsService: ProductsService, private fb: FormBuilder) {}

	public ngOnInit(): void {
		this.initializeValues();
		this.initializeForm();
	}

	private initializeValues(): void {
		this.isSubmitting$ = this.productsService.isSubmitting$;
		this.productErrorMessage$ = this.productsService.productErrorMessage$;
		this.getValidationMessage = this.productsService.getValidationMessage;
	}

	private initializeForm(): void {
		this.productForm = this.fb.group({
			name: [this.selectedProduct ? this.selectedProduct.name : '', [Validators.required, Validators.minLength(3)]],
			price: [this.selectedProduct ? this.selectedProduct.price : '', [Validators.required, Validators.min(0)]],
			description: [
				this.selectedProduct ? this.selectedProduct.description : '',
				[Validators.required, Validators.minLength(20)],
			],
			imgUrl: [this.selectedProduct ? this.selectedProduct.imgUrl : '', [Validators.required]],
		});
	}

	public get name() {
		return getControl(this.productForm, 'name');
	}

	public get description() {
		return getControl(this.productForm, 'description');
	}

	public get price() {
		return getControl(this.productForm, 'price');
	}

	public get imgUrl() {
		return getControl(this.productForm, 'imgUrl');
	}

	public closeModal(event: Event): void {
		if (event.target === event.currentTarget) {
			this.productsService.isModalOpened$.next(false);
			this.productsService.productErrorMessage$.next('');
			if (this.selectedProduct) {
				this.productsService.selectedProduct$.next(null);
			}
		}
	}

	public onSubmit(): void {
		this.productsService.isSubmitting$.next(true);
		const newProductData = this.productForm.value;

		if (this.selectedProduct) {
			this.productsService.updateProduct(newProductData, this.selectedProduct._id);
		} else {
			this.productsService.createProduct(newProductData);
		}
	}
}
