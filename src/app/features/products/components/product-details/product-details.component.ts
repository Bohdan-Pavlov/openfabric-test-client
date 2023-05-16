import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { IProductFromServer } from 'src/app/features/products/interfaces/products.interfaces';
import { ProductsService } from 'src/app/features/products/services/products.service';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
	public selectedProduct$!: BehaviorSubject<IProductFromServer | null>;
	public isLoading$!: BehaviorSubject<boolean>;
	public productErrorMessage$!: BehaviorSubject<string>;
	public fetchDataErrorMessage$!: BehaviorSubject<string>;

	constructor(private productsService: ProductsService, private route: ActivatedRoute) {}

	public ngOnInit(): void {
		this.initializeValues();
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.productsService.getProductById(id);
		}
	}

	public initializeValues(): void {
		this.selectedProduct$ = this.productsService.selectedProduct$;
		this.isLoading$ = this.productsService.isLoading$;
		this.productErrorMessage$ = this.productsService.productErrorMessage$;
		this.fetchDataErrorMessage$ = this.productsService.fetchDataErrorMessage$;
	}
}
