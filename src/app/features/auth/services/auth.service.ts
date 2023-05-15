import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {
	ACCESS_TOKEN,
	AuthValidationErrorMessages,
} from 'src/app/features/auth/auth.constants';
import {
	AuthResponse,
	AuthUserData,
} from 'src/app/features/auth/interfaces/auth.interfaces';
import { LocalStorageService } from 'src/app/features/auth/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
	public isAuth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	);

	public isSubmitting$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	);

	public authErrorMessage$: BehaviorSubject<string> =
		new BehaviorSubject<string>('');

	constructor(
		private http: HttpClient,
		private localStorageService: LocalStorageService
	) {}

	public login(loginUserData: AuthUserData): Observable<AuthResponse> {
		const path = environment.API_BASE_URL + 'auth/login';
		return this.http.post<AuthResponse>(path, loginUserData);
	}

	public register(registerUserData: AuthUserData): Observable<AuthResponse> {
		const path = environment.API_BASE_URL + 'auth/register';
		return this.http.post<AuthResponse>(path, registerUserData);
	}

	public logout(): void {
		this.isAuth$.next(false);
		this.localStorageService.remove(ACCESS_TOKEN);
	}

	public getValidationMessage(errors: any) {
		if (errors.required) {
			return AuthValidationErrorMessages.REQUIRED;
		}
		if (errors.pattern) {
			return AuthValidationErrorMessages.INVALID_EMAIL;
		}

		if (errors.minlength) {
			return AuthValidationErrorMessages.MIN_LENGTH;
		}

		if (errors.passwordMismatch) {
			return AuthValidationErrorMessages.PASSWORD_MISMATCH;
		}

		return 'Unknown error!';
	}
}
