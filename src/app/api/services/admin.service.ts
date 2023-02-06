/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { DeleteRequest } from '../models/delete-request';
import { StringBaseResponse } from '../models/string-base-response';
import { UserDtoIEnumerableBaseResponse } from '../models/user-dto-i-enumerable-base-response';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiAdminAlluserGet
   */
  static readonly ApiAdminAlluserGetPath = '/api/Admin/alluser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAdminAlluserGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAdminAlluserGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<UserDtoIEnumerableBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.ApiAdminAlluserGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDtoIEnumerableBaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAdminAlluserGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAdminAlluserGet$Plain(params?: {
  }): Observable<UserDtoIEnumerableBaseResponse> {

    return this.apiAdminAlluserGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<UserDtoIEnumerableBaseResponse>) => r.body as UserDtoIEnumerableBaseResponse)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAdminAlluserGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAdminAlluserGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<UserDtoIEnumerableBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.ApiAdminAlluserGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDtoIEnumerableBaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAdminAlluserGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAdminAlluserGet$Json(params?: {
  }): Observable<UserDtoIEnumerableBaseResponse> {

    return this.apiAdminAlluserGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<UserDtoIEnumerableBaseResponse>) => r.body as UserDtoIEnumerableBaseResponse)
    );
  }

  /**
   * Path part for operation apiAdminAlluserwithrolesGet
   */
  static readonly ApiAdminAlluserwithrolesGetPath = '/api/Admin/alluserwithroles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAdminAlluserwithrolesGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAdminAlluserwithrolesGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<UserDtoIEnumerableBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.ApiAdminAlluserwithrolesGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDtoIEnumerableBaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAdminAlluserwithrolesGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAdminAlluserwithrolesGet$Plain(params?: {
  }): Observable<UserDtoIEnumerableBaseResponse> {

    return this.apiAdminAlluserwithrolesGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<UserDtoIEnumerableBaseResponse>) => r.body as UserDtoIEnumerableBaseResponse)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAdminAlluserwithrolesGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAdminAlluserwithrolesGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<UserDtoIEnumerableBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.ApiAdminAlluserwithrolesGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDtoIEnumerableBaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAdminAlluserwithrolesGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAdminAlluserwithrolesGet$Json(params?: {
  }): Observable<UserDtoIEnumerableBaseResponse> {

    return this.apiAdminAlluserwithrolesGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<UserDtoIEnumerableBaseResponse>) => r.body as UserDtoIEnumerableBaseResponse)
    );
  }

  /**
   * Path part for operation apiAdminDeleteuserDelete
   */
  static readonly ApiAdminDeleteuserDeletePath = '/api/Admin/deleteuser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAdminDeleteuserDelete$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAdminDeleteuserDelete$Plain$Response(params?: {
    body?: DeleteRequest
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.ApiAdminDeleteuserDeletePath, 'delete');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<StringBaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAdminDeleteuserDelete$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAdminDeleteuserDelete$Plain(params?: {
    body?: DeleteRequest
  }): Observable<StringBaseResponse> {

    return this.apiAdminDeleteuserDelete$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAdminDeleteuserDelete$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAdminDeleteuserDelete$Json$Response(params?: {
    body?: DeleteRequest
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.ApiAdminDeleteuserDeletePath, 'delete');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<StringBaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAdminDeleteuserDelete$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAdminDeleteuserDelete$Json(params?: {
    body?: DeleteRequest
  }): Observable<StringBaseResponse> {

    return this.apiAdminDeleteuserDelete$Json$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

}
