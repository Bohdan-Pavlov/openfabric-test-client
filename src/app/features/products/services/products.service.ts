import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

import { ProductValidationErrorMessages } from 'src/app/features/products/products.constants';
import {
	ApiError,
	IProduct,
	IProductFromServer,
} from 'src/app/features/products/interfaces/products.interfaces';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductsService {
	public products$: BehaviorSubject<IProductFromServer[]> = new BehaviorSubject<
		IProductFromServer[]
	>([]);

	public isModalOpened$: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);

	public isSubmitting$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	);

	public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	);

	public selectedProduct$: BehaviorSubject<IProductFromServer | null> =
		new BehaviorSubject<IProductFromServer | null>(null);

	public productErrorMessage$: BehaviorSubject<string> =
		new BehaviorSubject<string>('');

	constructor(private http: HttpClient) {}

	public getProducts(): void {
		const path = environment.API_BASE_URL + 'products';
		this.isLoading$.next(true);
		this.http
			.get<IProductFromServer[]>(path)
			.pipe(take(1))
			.subscribe({
				next: (products: IProductFromServer[]) => {
					this.products$.next(products);
					this.isLoading$.next(false);
				},
				error: () => {
					this.products$.next([]);
					this.isLoading$.next(false);
				},
			});
	}

	public createProduct(newProductData: IProduct): void {
		const path = environment.API_BASE_URL + 'products';
		this.isLoading$.next(true);
		this.http.post<IProductFromServer>(path, newProductData).subscribe({
			next: (product: IProductFromServer) => {
				this.products$.next([...this.products$.value, product]);
				this.isSubmitting$.next(false);
				this.isModalOpened$.next(false);
				this.productErrorMessage$.next('');
				this.isLoading$.next(false);
			},
			error: error => {
				this.productErrorMessage$.next(error.error.message);
				this.isSubmitting$.next(false);
				this.isLoading$.next(false);
			},
		});
	}

	public updateProduct(newProductData: IProduct, id: string): void {
		const path = environment.API_BASE_URL + 'products/' + id;

		this.http.patch<IProductFromServer>(path, newProductData).subscribe({
			next: (product: IProductFromServer): void => {
				const updatedProducts: IProductFromServer[] = this.products$.value;
				const updatedProductIndex = updatedProducts.findIndex(
					(p: IProductFromServer) => p._id === product._id
				);
				updatedProducts[updatedProductIndex] = product;

				this.products$.next(updatedProducts);
				this.isSubmitting$.next(false);
				this.isModalOpened$.next(false);
				this.selectedProduct$.next(null);
				this.productErrorMessage$.next('');
			},
			error: (error: ApiError) => {
				this.productErrorMessage$.next(error.error.message);
				this.isSubmitting$.next(false);
			},
		});
	}

	public getValidationMessage(errors: any): string {
		if (errors.required) {
			return ProductValidationErrorMessages.REQUIRED;
		}

		if (errors.min) {
			return ProductValidationErrorMessages.MIN_VALUE;
		}

		if (errors.minlength) {
			if (errors.minlength.requiredLength === 3) {
				return ProductValidationErrorMessages.MIN_LENGTH_3;
			}

			return ProductValidationErrorMessages.MIN_LENGTH_20;
		}

		return 'Unknown error!';
	}
}
