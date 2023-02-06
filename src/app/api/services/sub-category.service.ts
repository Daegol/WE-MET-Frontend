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
import { SubCategoryDto } from '../models/sub-category-dto';
import { SubCategoryDtoBaseResponse } from '../models/sub-category-dto-base-response';
import { SubCategoryDtoIEnumerableBaseResponse } from '../models/sub-category-dto-i-enumerable-base-response';
import { SubCategoryRequest } from '../models/sub-category-request';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiSubCategoryGet
   */
  static readonly ApiSubCategoryGetPath = '/api/SubCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubCategoryGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubCategoryGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<SubCategoryDtoIEnumerableBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SubCategoryService.ApiSubCategoryGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SubCategoryDtoIEnumerableBaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSubCategoryGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubCategoryGet$Plain(params?: {
  }): Observable<SubCategoryDtoIEnumerableBaseResponse> {

    return this.apiSubCategoryGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<SubCategoryDtoIEnumerableBaseResponse>) => r.body as SubCategoryDtoIEnumerableBaseResponse)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubCategoryGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubCategoryGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<SubCategoryDtoIEnumerableBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SubCategoryService.ApiSubCategoryGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SubCategoryDtoIEnumerableBaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSubCategoryGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubCategoryGet$Json(params?: {
  }): Observable<SubCategoryDtoIEnumerableBaseResponse> {

    return this.apiSubCategoryGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<SubCategoryDtoIEnumerableBaseResponse>) => r.body as SubCategoryDtoIEnumerableBaseResponse)
    );
  }

  /**
   * Path part for operation apiSubCategoryPut
   */
  static readonly ApiSubCategoryPutPath = '/api/SubCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubCategoryPut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSubCategoryPut$Plain$Response(params?: {
    body?: SubCategoryDto
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SubCategoryService.ApiSubCategoryPutPath, 'put');
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
   * To access the full response (for headers, for example), `apiSubCategoryPut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSubCategoryPut$Plain(params?: {
    body?: SubCategoryDto
  }): Observable<StringBaseResponse> {

    return this.apiSubCategoryPut$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubCategoryPut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSubCategoryPut$Json$Response(params?: {
    body?: SubCategoryDto
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SubCategoryService.ApiSubCategoryPutPath, 'put');
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
   * To access the full response (for headers, for example), `apiSubCategoryPut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSubCategoryPut$Json(params?: {
    body?: SubCategoryDto
  }): Observable<StringBaseResponse> {

    return this.apiSubCategoryPut$Json$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * Path part for operation apiSubCategoryPost
   */
  static readonly ApiSubCategoryPostPath = '/api/SubCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubCategoryPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSubCategoryPost$Plain$Response(params?: {
    body?: SubCategoryRequest
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SubCategoryService.ApiSubCategoryPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiSubCategoryPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSubCategoryPost$Plain(params?: {
    body?: SubCategoryRequest
  }): Observable<StringBaseResponse> {

    return this.apiSubCategoryPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubCategoryPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSubCategoryPost$Json$Response(params?: {
    body?: SubCategoryRequest
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SubCategoryService.ApiSubCategoryPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiSubCategoryPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSubCategoryPost$Json(params?: {
    body?: SubCategoryRequest
  }): Observable<StringBaseResponse> {

    return this.apiSubCategoryPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * Path part for operation apiSubCategoryDelete
   */
  static readonly ApiSubCategoryDeletePath = '/api/SubCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubCategoryDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubCategoryDelete$Plain$Response(params?: {
    id?: number;
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SubCategoryService.ApiSubCategoryDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `apiSubCategoryDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubCategoryDelete$Plain(params?: {
    id?: number;
  }): Observable<StringBaseResponse> {

    return this.apiSubCategoryDelete$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubCategoryDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubCategoryDelete$Json$Response(params?: {
    id?: number;
  }): Observable<StrictHttpResponse<StringBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SubCategoryService.ApiSubCategoryDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `apiSubCategoryDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubCategoryDelete$Json(params?: {
    id?: number;
  }): Observable<StringBaseResponse> {

    return this.apiSubCategoryDelete$Json$Response(params).pipe(
      map((r: StrictHttpResponse<StringBaseResponse>) => r.body as StringBaseResponse)
    );
  }

  /**
   * Path part for operation apiSubCategoryIdGet
   */
  static readonly ApiSubCategoryIdGetPath = '/api/SubCategory/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubCategoryIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubCategoryIdGet$Plain$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<SubCategoryDtoBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SubCategoryService.ApiSubCategoryIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SubCategoryDtoBaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSubCategoryIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubCategoryIdGet$Plain(params: {
    id: number;
  }): Observable<SubCategoryDtoBaseResponse> {

    return this.apiSubCategoryIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<SubCategoryDtoBaseResponse>) => r.body as SubCategoryDtoBaseResponse)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubCategoryIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubCategoryIdGet$Json$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<SubCategoryDtoBaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SubCategoryService.ApiSubCategoryIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SubCategoryDtoBaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSubCategoryIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubCategoryIdGet$Json(params: {
    id: number;
  }): Observable<SubCategoryDtoBaseResponse> {

    return this.apiSubCategoryIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<SubCategoryDtoBaseResponse>) => r.body as SubCategoryDtoBaseResponse)
    );
  }

}
