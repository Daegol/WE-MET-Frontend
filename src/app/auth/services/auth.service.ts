import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Credentials, DecodedToken, User } from '@we-met-app/auth/models';
import { AuthenticationRequest } from '@we-met-app/api/models';

import { catchError, map } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';

import { ErrorHandlerService } from '@we-met-app/shared/error-handler/error-handler.service';
import { SnackBarComponent } from '@we-met-app/core/components/snackbar/snackbar.component';
import { AccountService } from '@we-met-app/api/services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loginUser: AuthenticationRequest = {
    userName: "",
    password: ""
  };

  private params?: {
    body?: AuthenticationRequest
  } = {};

  constructor(private accountService: AccountService, private snackbar: SnackBarComponent, private errorHandlerService: ErrorHandlerService) { }

  login({ username, password }: Credentials): Observable<User> {

    this.setLoginUser(username, password);

    this.setParamsBody(this.loginUser);

    return this.accountService.apiAccountAuthenticatePost$Response(this.params).pipe(
      map(response => {
        return { token: this.getToken(response.body), decodedToken: this.decodeToken(response.body), email: this.getUserEmail(response.body), userId: this.getUserId(response.body), firstName: this.getUserFirstName(response.body), lastName: this.getUserLastName(response.body), userName: this.getUserName(response.body) } as User;
      }),
      catchError(error => {
        this.snackbar.showError(this.errorHandlerService.parseErrors(error));
        return throwError(this.errorHandlerService.parseErrors(error));
      })
    );
  }

  private setLoginUser(username: string, password: string) {
    this.loginUser.userName = username;
    this.loginUser.password = password;
  }

  private setParamsBody(paramsBody) {
    this.params.body = paramsBody;
  }

  private getToken(body) {
    try {
      let bodyJSON = JSON.parse(body);
      let dataJSON = bodyJSON?.data;
      return dataJSON?.jwToken;
    } catch (error) {
      return null;
    }
  }

  private decodeToken(body): DecodedToken {
    try {
      let bodyJSON = JSON.parse(body);
      let dataJSON = bodyJSON?.data;
      let jwToken = dataJSON?.jwToken;
      return jwtDecode(jwToken);
    } catch (error) {
      return null;
    }
  }

  private getUserId(body) {
    try {
      let decodedToken = this.decodeToken(body);
      return decodedToken !== null ? decodedToken.uid : null;
    } catch (error) {
      return null;
    }
  }

  private getUserFirstName(body) {
    try {
      let bodyJSON = JSON.parse(body);
      let dataJSON = bodyJSON?.data;
      return dataJSON?.firstName;
    } catch (error) {
      return null;
    }
  }

  private getUserLastName(body) {
    try {
      let bodyJSON = JSON.parse(body);
      let dataJSON = bodyJSON?.data;
      return dataJSON?.lastName;
    } catch (error) {
      return null;
    }
  }

  private getUserEmail(body) {
    try {
      let decodedToken = this.decodeToken(body);
      return decodedToken !== null ? decodedToken.email : null;
    } catch (error) {
      return null;
    }
  }

  private getUserName(body) {
    try {
      let decodedToken = this.decodeToken(body);
      return decodedToken !== null ? decodedToken.sub : null;
    } catch (error) {
      return null;
    }
  }

  logout() {
    return of(true);
  }
}
