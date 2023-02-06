import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';

import { CoreModule } from './core';
import { AuthModule } from './auth';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout'
import { AppComponent } from './core/containers';
import { UnsavedDialogComponent } from './shared/components/unsaved-dialog/unsaved-dialog.component';
import { RouterEffects, UserEffects } from './core/effects';
import { RootStoreModule } from './root-store/root-store.module';
import { ErrorHandlerService } from './shared/error-handler/error-handler.service';
import { SnackBarComponent } from './core/components/snackbar/snackbar.component';
import { CanDeactivateGuard } from './shared/guards/can-deactivate-guard';
import { TokenInterceptorProvider } from './_interceptors/token.interceptor';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ROOT_REDUCERS, metaReducers } from './root-store/root-state';
import { MyPageModule } from './my-page';
import { DictionariesModule } from './dictionaries';
import { ApiModule } from './api/api.module';
import { PurchaseManageModule } from './purchase';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        AuthModule,
        AppRoutingModule,
        FlexLayoutModule,
        FormsModule,
        MyPageModule,
        DictionariesModule,
        PurchaseManageModule,
        MaterialModule,
        RootStoreModule,
        StoreModule,
        EffectsModule.forRoot([UserEffects, RouterEffects]),
        StoreModule.forRoot(ROOT_REDUCERS, {
            metaReducers,
            runtimeChecks: {
                // strictStateImmutability and strictActionImmutability are enabled by default
                strictStateSerializability: true,
                //strictActionSerializability: true,
                strictActionWithinNgZone: true,
                strictActionTypeUniqueness: true,
            },
        }),

        /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
        StoreRouterConnectingModule.forRoot(),

        /**
         * Store devtools instrument the store retaining past versions of state
         * and recalculating new states. This enables powerful time-travel
         * debugging.
         *
         * To use the debugger, install the Redux Devtools extension for either
         * Chrome or Firefox
         *
         * See: https://github.com/zalmoxisus/redux-devtools-extension
         */
        StoreDevtoolsModule.instrument({
            name: 'WE-MET',

            // In a production build you would want to disable the Store Devtools
            // logOnly: environment.production,
        }),

        /**
         * EffectsModule.forRoot() is imported once in the root module and
         * sets up the effects class to be initialized immediately when the
         * application starts.
         *
         * See: https://ngrx.io/guide/effects#registering-root-effects
         */
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        !environment.production ? ApiModule.forRoot({ rootUrl: "https://localhost:44311" }) : ApiModule.forRoot({ rootUrl: "https://wemet.azurewebsites.net" }),
    ],
    providers: [TokenInterceptorProvider, SnackBarComponent, ErrorHandlerService, CanDeactivateGuard,
        { provide: LOCALE_ID, useValue: 'pl-PL' }],
    bootstrap: [AppComponent],
    declarations: [UnsavedDialogComponent]
})
export class AppModule {
}
