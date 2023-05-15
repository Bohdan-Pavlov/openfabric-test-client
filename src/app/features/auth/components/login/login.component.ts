import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { REGISTER_PAGE_ROUTE } from 'src/app/app.constants';
import {
	ACCESS_TOKEN,
	EMAIL_PATTERN,
} from 'src/app/features/auth/auth.constants';
import { AuthResponse } from 'src/app/features/auth/interfaces/auth.interfaces';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { LocalStorageService } from 'src/app/features/auth/services/local-storage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
	protected readonly REGISTER_PAGE_ROUTE = REGISTER_PAGE_ROUTE;
	public loginForm!: FormGroup;

	constructor(
		private fb: FormBuilder,
		public authService: AuthService,
		private router: Router,
		private localStorageService: LocalStorageService
	) {}

	public ngOnInit(): void {
		this.initializeForm();
	}

	private initializeForm(): void {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
			password: ['', Validators.required],
		});
	}

	public get email() {
		return this.loginForm.get('email');
	}

	public get password() {
		return this.loginForm.get('password');
	}

	public onSubmit(): void {
		this.authService.isSubmitting$.next(true);
		const userData = this.loginForm.value;
		this.authService.login(userData).subscribe({
			next: (response: AuthResponse) => {
				this.localStorageService.set(ACCESS_TOKEN, response.accessToken);
				this.authService.isAuth$.next(true);
				this.authService.authErrorMessage$.next('');
				this.authService.isSubmitting$.next(false);
				this.router.navigate(['/']);
			},
			error: err => {
				this.authService.authErrorMessage$.next(err.error.message);
				this.authService.isSubmitting$.next(false);
			},
		});
	}
}
