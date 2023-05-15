import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AuthInterceptor } from 'src/app/features/auth/services/auth-interceptor.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { LocalStorageService } from 'src/app/features/auth/services/local-storage.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		RouterLink,
		SharedModule,
	],
	providers: [
		AuthService,
		LocalStorageService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
	],
})
export class AuthModule {}
