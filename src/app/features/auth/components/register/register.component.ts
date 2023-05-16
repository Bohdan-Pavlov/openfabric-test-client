import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { LOGIN_PAGE_ROUTE } from 'src/app/app.constants';
import { EMAIL_PATTERN } from 'src/app/features/auth/auth.constants';
import { AuthUserData } from 'src/app/features/auth/interfaces/auth.interfaces';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { matchPasswordValidator } from 'src/app/features/auth/validators/match-password.validator';
import { getControl } from 'src/app/shared/helpers/get-control.helper';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {
	protected readonly LOGIN_PAGE_ROUTE = LOGIN_PAGE_ROUTE;
	public registerForm!: FormGroup;
	public isSubmitting$!: BehaviorSubject<boolean>;
	public authErrorMessage$!: BehaviorSubject<string>;
	public getValidationMessage!: (errors: ValidationErrors) => string;

	constructor(private fb: FormBuilder, private authService: AuthService) {}

	public ngOnInit(): void {
		this.initializeValues();
		this.initializeForm();
	}

	private initializeValues(): void {
		this.isSubmitting$ = this.authService.isSubmitting$;
		this.authErrorMessage$ = this.authService.authErrorMessage$;
		this.getValidationMessage = this.authService.getValidationMessage;
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
		return getControl(this.registerForm, 'email');
	}

	public get password() {
		return getControl(this.registerForm, 'password');
	}

	public get confirmPassword() {
		return getControl(this.registerForm, 'confirmPassword');
	}

	public onSubmit(): void {
		const userData: AuthUserData = {
			email: this.registerForm.value.email,
			password: this.registerForm.value.password,
		};
		this.authService.auth(userData, 'register');
	}

	public ngOnDestroy(): void {
		this.authService.authErrorMessage$.next('');
	}
}
