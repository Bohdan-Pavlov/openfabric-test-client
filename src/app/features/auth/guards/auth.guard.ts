import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { MAIN_PAGE_ROUTE } from 'src/app/app.constants';

import { ACCESS_TOKEN } from 'src/app/features/auth/auth.constants';
import { LocalStorageService } from 'src/app/features/auth/services/local-storage.service';

export const authGuard = (): UrlTree | boolean => {
	const localStorageService: LocalStorageService = inject(LocalStorageService);
	const router: Router = inject(Router);

	const token = localStorageService.get(ACCESS_TOKEN);
	return token ? router.createUrlTree([MAIN_PAGE_ROUTE]) : true;
};
