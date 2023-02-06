import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '@we-met-app/auth/actions';
import { State } from '@we-met-app/root-store/root-state';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private store: Store<State>, private router: Router) { }

  parseErrors(errors: any): string {
    try {
      if (this.isHtttpErrorResponse(errors)) {
        return this.checkErrorResponse(errors);
      }
      return this.handleUnexpectedErrorResponse();

    } catch (error) {
      return this.handleUnexpectedErrorResponse();
    }
  }

  private tryParseArrayErrors(params: any): string {
    try {
      let paramsError = params.error;
      let errObj = JSON.parse(paramsError).Message;
      return Object.values(errObj).join("");
    } catch (error) {
      return this.handleUnexpectedErrorResponse();
    }
  }

  private checkErrorResponse(error): string {
    switch (error.status) {
      case 401:
        return this.handle401ErrorResponse();

      case 403:
        return this.handle403ErrorResponse();

      case 500:
        return this.handle500ErrorResponse();

      default:
        return this.tryParseArrayErrors(error);
    }
  }

  private handle401ErrorResponse(): string {
    this.logout();
    return "Nie masz odpowiednich uprawnień.";
  }

  private handle403ErrorResponse(): string {
    this.router.navigate(['/access-denied']);;
    return "Odmowa dostępu.";
  }

  private handle500ErrorResponse(): string {
    return "Wystąpił błąd wewnętrzny serwera.";
  }

  private handleUnexpectedErrorResponse(): string {
    return "Wystąpił nieoczekiwany błąd.";
  }

  private logout() {
    this.store.dispatch(AuthActions.logout());
  }

  private isHtttpErrorResponse(error) {
    return error instanceof HttpErrorResponse ? true : false;
  }
}
