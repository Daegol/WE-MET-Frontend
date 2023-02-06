import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { first, switchMap } from 'rxjs/operators';
import { AuthSelectors } from '@we-met-app/root-store';
import { State } from '@we-met-app/root-store/root-state';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private store: Store<State>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.store.select(AuthSelectors.selectUser).pipe(
            // first() prevents infinite requests loop
            first(),
            switchMap((user) => {
                let userToken = user?.token;
                const authRequest = !!userToken ? req.clone({
                    setHeaders: {
                        Authorization: 'Bearer ' + userToken
                    }
                }) : req;
                return next.handle(authRequest);
            })
        );
    }
}

export const TokenInterceptorProvider = [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];