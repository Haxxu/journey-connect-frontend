import { TokenStorageService } from '@/services/token-storage.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshToken$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private isRefresh = false;

  constructor(private tokenStorageService: TokenStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    const access_token = this.tokenStorageService.getAccessToken();
    if (access_token) {
      authReq = this.addTokenForAuthHeader(req, access_token);
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        const isError = error instanceof HttpErrorResponse;
        const isStatus401 = error.static === 401;
        if (isError && isStatus401) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefresh) {
      this.isRefresh = true;
      this.refreshToken$.next(null);
      const refreshToken = this.tokenStorageService.getRefreshToken();
      if (refreshToken && refreshToken !== 'undefined') {
        return this.authService
          .refreshToken({
            refreshToken: refreshToken,
          })
          .pipe(
            tap(({ accessToken }) => {
              this.isRefresh = false;
              this.tokenStorageService.saveToken(accessToken);
              this.refreshToken$.next(accessToken);
            }),
            switchMap(({ accessToken }) => {
              return next.handle(
                this.addTokenForAuthHeader(request, accessToken)
              );
            }),
            catchError((err) => {
              this.isRefresh = false;
              return throwError(() => err);
            })
          );
      } else {
        this.isRefresh = false;
        this.logOut();
      }
    }
    return this.refreshToken$.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => {
        return next.handle(this.addTokenForAuthHeader(request, token));
      })
    );
  }

  private addTokenForAuthHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
    });
  }
}

export const TOKEN_HEADER_KEY = 'Authorization';
