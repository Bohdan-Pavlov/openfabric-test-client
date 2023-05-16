import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProductsRoutingModule } from 'src/app/features/products/products-routing.module';
import { ProductsService } from 'src/app/features/products/services/products.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsComponent } from './products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { AddProductButtonComponent } from './components/add-product-button/add-product-button.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { GoBackButtonComponent } from './components/go-back-button/go-back-button.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';

@NgModule({
	declarations: [
		ProductsComponent,
		ProductCardComponent,
		AddProductButtonComponent,
		ProductModalComponent,
		ProductDetailsComponent,
		GoBackButtonComponent,
		DeleteButtonComponent,
	],
	imports: [
		CommonModule,
		ProductsRoutingModule,
		MatCardModule,
		MatButtonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		SharedModule,
		MatGridListModule,
		MatProgressSpinnerModule,
	],
	providers: [ProductsService],
})
export class ProductsModule {}
