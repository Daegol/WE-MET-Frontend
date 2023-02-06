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

import { MainCategoryDto } from '../models/main-category-dto';
import { MainCategoryDtoBaseResponse } from '../models/main-category-dto-base-response';
import { MainCategoryDtoIEnumerableBaseResponse } from '../models/main-category-dto-i-enumerable-base-response';
import { MainCategoryRequest } from '../models/main-category-request';
import { StringBaseResponse } from '../models/string-base-response';

@Injectable({
  providedIn: 'root',
})
export class MainCategoryService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiMainCategoryGet
   */
  static readonly ApiMainCategoryGetPath = '/api/MainCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiMainCategoryGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiMainCategoryGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<MainCategoryDtoIEnumerableBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MainCategoryService.ApiMainCategoryGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MainCategoryDtoIEnumerableBaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiMainCategoryGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiMainCategoryGet$Plain(params?: {
  }): Observable<MainCategoryDtoIEnumerableBaseResponse> {

    return this.apiMainCategoryGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<MainCategoryDtoIEnumerableBaseResponse>) => r.body as MainCategoryDtoIEnumerableBaseResponse)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiMainCategoryGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiMainCategoryGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<MainCategoryDtoIEnumerableBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MainCategoryService.ApiMainCategoryGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MainCategoryDtoIEnumerableBaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiMainCategoryGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiMainCategoryGet$Json(params?: {
  }): Observable<MainCategoryDtoIEnumerableBaseResponse> {

    return this.apiMainCategoryGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<MainCategoryDtoIEnumerableBaseResponse>) => r.body as MainCategoryDtoIEnumerableBaseResponse)
    );
  }

  /**
   * Path part for operation apiMainCategoryPut
   */
  static readonly ApiMainCategoryPutPath = '/api/MainCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiMainCategoryPut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiMainCategoryPut$Plain$Response(params?: {
    body?: MainCategoryDto
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MainCategoryService.ApiMainCategoryPutPath, 'put');
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
   * To access the full response (for headers, for example), `apiMainCategoryPut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiMainCategoryPut$Plain(params?: {
    body?: MainCategoryDto
  }): Observable<StringBaseResponse> {

    return this.apiMainCategoryPut$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiMainCategoryPut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiMainCategoryPut$Json$Response(params?: {
    body?: MainCategoryDto
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MainCategoryService.ApiMainCategoryPutPath, 'put');
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
   * To access the full response (for headers, for example), `apiMainCategoryPut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiMainCategoryPut$Json(params?: {
    body?: MainCategoryDto
  }): Observable<StringBaseResponse> {

    return this.apiMainCategoryPut$Json$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * Path part for operation apiMainCategoryPost
   */
  static readonly ApiMainCategoryPostPath = '/api/MainCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiMainCategoryPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiMainCategoryPost$Plain$Response(params?: {
    body?: MainCategoryRequest
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MainCategoryService.ApiMainCategoryPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiMainCategoryPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiMainCategoryPost$Plain(params?: {
    body?: MainCategoryRequest
  }): Observable<StringBaseResponse> {

    return this.apiMainCategoryPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiMainCategoryPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiMainCategoryPost$Json$Response(params?: {
    body?: MainCategoryRequest
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MainCategoryService.ApiMainCategoryPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiMainCategoryPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiMainCategoryPost$Json(params?: {
    body?: MainCategoryRequest
  }): Observable<StringBaseResponse> {

    return this.apiMainCategoryPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * Path part for operation apiMainCategoryDelete
   */
  static readonly ApiMainCategoryDeletePath = '/api/MainCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiMainCategoryDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiMainCategoryDelete$Plain$Response(params?: {
    id?: number;
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MainCategoryService.ApiMainCategoryDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `apiMainCategoryDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiMainCategoryDelete$Plain(params?: {
    id?: number;
  }): Observable<StringBaseResponse> {

    return this.apiMainCategoryDelete$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiMainCategoryDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiMainCategoryDelete$Json$Response(params?: {
    id?: number;
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MainCategoryService.ApiMainCategoryDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `apiMainCategoryDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiMainCategoryDelete$Json(params?: {
    id?: number;
  }): Observable<StringBaseResponse> {

    return this.apiMainCategoryDelete$Json$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * Path part for operation apiMainCategoryIdGet
   */
  static readonly ApiMainCategoryIdGetPath = '/api/MainCategory/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiMainCategoryIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiMainCategoryIdGet$Plain$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<MainCategoryDtoBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MainCategoryService.ApiMainCategoryIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MainCategoryDtoBaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiMainCategoryIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiMainCategoryIdGet$Plain(params: {
    id: number;
  }): Observable<MainCategoryDtoBaseResponse> {

    return this.apiMainCategoryIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<MainCategoryDtoBaseResponse>) => r.body as MainCategoryDtoBaseResponse)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiMainCategoryIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiMainCategoryIdGet$Json$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<MainCategoryDtoBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MainCategoryService.ApiMainCategoryIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MainCategoryDtoBaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiMainCategoryIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiMainCategoryIdGet$Json(params: {
    id: number;
  }): Observable<MainCategoryDtoBaseResponse> {

    return this.apiMainCategoryIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<MainCategoryDtoBaseResponse>) => r.body as MainCategoryDtoBaseResponse)
    );
  }

}
