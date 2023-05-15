import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOGIN_PAGE_ROUTE } from 'src/app/app.constants';
import {
	ACCESS_TOKEN,
	EMAIL_PATTERN,
} from 'src/app/features/auth/auth.constants';
import {
	AuthResponse,
	AuthUserData,
} from 'src/app/features/auth/interfaces/auth.interfaces';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { LocalStorageService } from 'src/app/features/auth/services/local-storage.service';
import { matchPasswordValidator } from 'src/app/features/auth/validators/match-password.validator';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	protected readonly LOGIN_PAGE_ROUTE = LOGIN_PAGE_ROUTE;
	public registerForm!: FormGroup;

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
		this.registerForm = this.fb.group(
			{
				email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
				password: ['', [Validators.required, Validators.minLength(6)]],
				confirmPassword: ['', Validators.required],
			},
			{ validators: matchPasswordValidator }
		);
	}

	public get email() {
		return this.registerForm.get('email');
	}

	public get password() {
		return this.registerForm.get('password');
	}

	public get confirmPassword() {
		return this.registerForm.get('confirmPassword');
	}

	public onSubmit(): void {
		this.authService.isSubmitting$.next(true);
		const userData: AuthUserData = {
			email: this.registerForm.value.email,
			password: this.registerForm.value.password,
		};
		this.authService.register(userData).subscribe({
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
