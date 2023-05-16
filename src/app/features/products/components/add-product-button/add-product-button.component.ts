import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-add-product-button',
	templateUrl: './add-product-button.component.html',
	styleUrls: ['./add-product-button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductButtonComponent {}
