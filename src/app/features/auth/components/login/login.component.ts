import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { REGISTER_PAGE_ROUTE } from 'src/app/app.constants';
import { EMAIL_PATTERN } from 'src/app/features/auth/auth.constants';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { getControl } from 'src/app/shared/helpers/get-control.helper';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
	protected readonly REGISTER_PAGE_ROUTE = REGISTER_PAGE_ROUTE;
	public loginForm!: FormGroup;
	public isSubmitting$!: BehaviorSubject<boolean>;
	public authErrorMessage$!: BehaviorSubject<string>;
	public getValidationMessage!: (errors: ValidationErrors) => string;

	constructor(private fb: FormBuilder, public authService: AuthService) {}

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
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
			password: ['', Validators.required],
		});
	}

	public get email() {
		return getControl(this.loginForm, 'email');
	}

	public get password() {
		return getControl(this.loginForm, 'password');
	}

	public onSubmit(): void {
		const userData = this.loginForm.value;
		this.authService.auth(userData, 'login');
	}

	public ngOnDestroy(): void {
		this.authService.authErrorMessage$.next('');
	}
}
