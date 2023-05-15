import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LocalStorageService } from 'src/app/features/auth/services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	public constructor(private localStorageService: LocalStorageService) {}

	public intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const token = this.localStorageService.get('accessToken');
		request = request.clone({
			setHeaders: {
				Authorization: token ? `Bearer ${token}` : '',
			},
		});
		return next.handle(request);
	}
}
