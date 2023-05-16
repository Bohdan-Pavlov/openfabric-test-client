import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/features/auth/services/auth.service';
import { LocalStorageService } from 'src/app/features/auth/services/local-storage.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
	constructor(private authService: AuthService, private localStorageService: LocalStorageService) {}

	public ngOnInit(): void {
		const token = this.localStorageService.get('accessToken');
		this.authService.isAuth$.next(!!token);
	}
}
