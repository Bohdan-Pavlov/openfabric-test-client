import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, take } from 'rxjs';

import { ACCESS_TOKEN, AuthValidationErrorMessages } from 'src/app/features/auth/auth.constants';
import { AuthResponse, AuthUserData } from 'src/app/features/auth/interfaces/auth.interfaces';
import { LocalStorageService } from 'src/app/features/auth/services/local-storage.service';
import { ApiError } from 'src/app/features/products/interfaces/products.interfaces';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
	public isAuth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	public isSubmitting$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	public authErrorMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('');

	constructor(private http: HttpClient, private localStorageService: LocalStorageService, private router: Router) {}

	public auth(authUserData: AuthUserData, route: string): void {
		const path = environment.API_BASE_URL + 'auth/' + route;

		this.isSubmitting$.next(true);
		this.http
			.post<AuthResponse>(path, authUserData)
			.pipe(take(1))
			.subscribe({
				next: (response: AuthResponse) => {
					this.localStorageService.set(ACCESS_TOKEN, response.accessToken);
					this.isAuth$.next(true);
					this.authErrorMessage$.next('');
					this.isSubmitting$.next(false);
					this.router.navigate(['/']);
				},
				error: (err: ApiError) => {
					this.authErrorMessage$.next(err.error.message);
					this.isSubmitting$.next(false);
				},
			});
	}

	public logout(): void {
		this.isAuth$.next(false);
		this.localStorageService.remove(ACCESS_TOKEN);
	}

	public getValidationMessage(errors: ValidationErrors): string {
		if (errors['required']) {
			return AuthValidationErrorMessages.REQUIRED;
		}
		if (errors['pattern']) {
			return AuthValidationErrorMessages.INVALID_EMAIL;
		}

		if (errors['minlength']) {
			return AuthValidationErrorMessages.MIN_LENGTH;
		}

		if (errors['passwordMismatch']) {
			return AuthValidationErrorMessages.PASSWORD_MISMATCH;
		}

		return 'Unknown error!';
	}
}
