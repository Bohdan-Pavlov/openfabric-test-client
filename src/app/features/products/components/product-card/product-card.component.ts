import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from 'src/app/features/auth/services/auth.service';
import { IProductFromServer } from 'src/app/features/products/interfaces/products.interfaces';
import { ProductsService } from 'src/app/features/products/services/products.service';

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit {
	@Input() product!: IProductFromServer;

	public isAuth$!: BehaviorSubject<boolean>;

	constructor(private productsService: ProductsService, private authService: AuthService, private router: Router) {}

	public ngOnInit(): void {
		this.isAuth$ = this.authService.isAuth$;
	}

	public openProductDetails(event: Event): void {
		event.stopPropagation();
		this.router.navigate([`/details/${this.product._id}`]);
	}

	public onEditProduct(event: Event): void {
		event.stopPropagation();
		this.productsService.selectedProduct$.next(this.product);
		this.productsService.isModalOpened$.next(true);
	}
}
