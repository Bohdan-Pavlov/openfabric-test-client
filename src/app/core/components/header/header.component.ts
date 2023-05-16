import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { LOGIN_PAGE_ROUTE } from 'src/app/app.constants';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	constructor(public authService: AuthService, private router: Router) {}

	public onAuthButtonClick(): void {
		if (this.authService.isAuth$.value) {
			return this.authService.logout();
		}

		this.router.navigate(['/' + LOGIN_PAGE_ROUTE]);
	}
}
