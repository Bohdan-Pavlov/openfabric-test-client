import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { IProductFromServer } from 'src/app/features/products/interfaces/products.interfaces';

import { ProductsService } from 'src/app/features/products/services/products.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
	public products$!: BehaviorSubject<IProductFromServer[]>;
	public isAuth$!: BehaviorSubject<boolean>;
	public isLoading$!: BehaviorSubject<boolean>;
	public selectedProduct$!: BehaviorSubject<IProductFromServer | null>;
	public isModalOpened$!: BehaviorSubject<boolean>;

	constructor(private productsService: ProductsService, private authService: AuthService) {}

	public ngOnInit(): void {
		this.initializeValues();
		this.productsService.getProducts();
	}

	private initializeValues(): void {
		this.products$ = this.productsService.products$;
		this.isAuth$ = this.authService.isAuth$;
		this.isLoading$ = this.productsService.isLoading$;
		this.selectedProduct$ = this.productsService.selectedProduct$;
		this.isModalOpened$ = this.productsService.isModalOpened$;
	}

	public openModal(): void {
		this.productsService.isModalOpened$.next(true);
	}
}
