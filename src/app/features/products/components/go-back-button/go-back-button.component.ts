import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MAIN_PAGE_ROUTE } from 'src/app/app.constants';

@Component({
	selector: 'app-go-back-button',
	templateUrl: './go-back-button.component.html',
	styleUrls: ['./go-back-button.component.scss'],
})
export class GoBackButtonComponent {
	constructor(private router: Router) {}

	public goBackToMainPage(): void {
		this.router.navigate([MAIN_PAGE_ROUTE]);
	}
}
