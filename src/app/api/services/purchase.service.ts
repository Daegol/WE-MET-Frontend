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

import { StringBaseResponse } from '../models/string-base-response';
import { PurchaseDto } from '../models/purchase-dto';
import { PurchaseDtoBaseResponse } from '../models/purchase-dto-base-response';
import { PurchaseDtoIEnumerableBaseResponse } from '../models/purchase-dto-i-enumerable-base-response';
import { PurchaseRequest } from '../models/purchase-request';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiPurchaseGet
   */
  static readonly ApiPurchaseGetPath = '/api/Purchase';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPurchaseGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<PurchaseDtoIEnumerableBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, PurchaseService.ApiPurchaseGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PurchaseDtoIEnumerableBaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPurchaseGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseGet$Plain(params?: {
  }): Observable<PurchaseDtoIEnumerableBaseResponse> {

    return this.apiPurchaseGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<PurchaseDtoIEnumerableBaseResponse>) => r.body as PurchaseDtoIEnumerableBaseResponse)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPurchaseGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<PurchaseDtoIEnumerableBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, PurchaseService.ApiPurchaseGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PurchaseDtoIEnumerableBaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPurchaseGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseGet$Json(params?: {
  }): Observable<PurchaseDtoIEnumerableBaseResponse> {

    return this.apiPurchaseGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<PurchaseDtoIEnumerableBaseResponse>) => r.body as PurchaseDtoIEnumerableBaseResponse)
    );
  }

  /**
   * Path part for operation apiPurchasePut
   */
  static readonly ApiPurchasePutPath = '/api/Purchase';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPurchasePut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPurchasePut$Plain$Response(params?: {
    body?: PurchaseDto
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, PurchaseService.ApiPurchasePutPath, 'put');
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
   * To access the full response (for headers, for example), `apiPurchasePut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPurchasePut$Plain(params?: {
    body?: PurchaseDto
  }): Observable<StringBaseResponse> {

    return this.apiPurchasePut$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPurchasePut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPurchasePut$Json$Response(params?: {
    body?: PurchaseDto
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, PurchaseService.ApiPurchasePutPath, 'put');
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
   * To access the full response (for headers, for example), `apiPurchasePut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPurchasePut$Json(params?: {
    body?: PurchaseDto
  }): Observable<StringBaseResponse> {

    return this.apiPurchasePut$Json$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * Path part for operation apiPurchasePost
   */
  static readonly ApiPurchasePostPath = '/api/Purchase';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPurchasePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPurchasePost$Plain$Response(params?: {
    body?: PurchaseRequest
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, PurchaseService.ApiPurchasePostPath, 'post');
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
   * To access the full response (for headers, for example), `apiPurchasePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPurchasePost$Plain(params?: {
    body?: PurchaseRequest
  }): Observable<StringBaseResponse> {

    return this.apiPurchasePost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPurchasePost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPurchasePost$Json$Response(params?: {
    body?: PurchaseRequest
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, PurchaseService.ApiPurchasePostPath, 'post');
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
   * To access the full response (for headers, for example), `apiPurchasePost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPurchasePost$Json(params?: {
    body?: PurchaseRequest
  }): Observable<StringBaseResponse> {

    return this.apiPurchasePost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * Path part for operation apiPurchaseDelete
   */
  static readonly ApiPurchaseDeletePath = '/api/Purchase';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPurchaseDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseDelete$Plain$Response(params?: {
    id?: number;
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, PurchaseService.ApiPurchaseDeletePath, 'delete');
    if (params) {
      rb.query('id', params.id, {});
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
   * To access the full response (for headers, for example), `apiPurchaseDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseDelete$Plain(params?: {
    id?: number;
  }): Observable<StringBaseResponse> {

    return this.apiPurchaseDelete$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPurchaseDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseDelete$Json$Response(params?: {
    id?: number;
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, PurchaseService.ApiPurchaseDeletePath, 'delete');
    if (params) {
      rb.query('id', params.id, {});
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
   * To access the full response (for headers, for example), `apiPurchaseDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseDelete$Json(params?: {
    id?: number;
  }): Observable<StringBaseResponse> {

    return this.apiPurchaseDelete$Json$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * Path part for operation apiPurchaseIdGet
   */
  static readonly ApiPurchaseIdGetPath = '/api/Purchase/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPurchaseIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseIdGet$Plain$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<PurchaseDtoBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, PurchaseService.ApiPurchaseIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PurchaseDtoBaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPurchaseIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseIdGet$Plain(params: {
    id: number;
  }): Observable<PurchaseDtoBaseResponse> {

    return this.apiPurchaseIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<PurchaseDtoBaseResponse>) => r.body as PurchaseDtoBaseResponse)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPurchaseIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseIdGet$Json$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<PurchaseDtoBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, PurchaseService.ApiPurchaseIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PurchaseDtoBaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPurchaseIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseIdGet$Json(params: {
    id: number;
  }): Observable<PurchaseDtoBaseResponse> {

    return this.apiPurchaseIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<PurchaseDtoBaseResponse>) => r.body as PurchaseDtoBaseResponse)
    );
  }

}
