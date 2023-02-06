import {
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
    Action,
    ActionReducerMap
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import { InjectionToken } from '@angular/core';
import { localStorageSync } from 'ngrx-store-localstorage';

import { authFeatureKey } from './auth-store/auth-state';
import * as AuthStore from '@we-met-app/root-store/auth-store/auth-state';

import { coreFeatureKey } from './core-store/core-state';
import * as CoreStore from '@we-met-app/root-store/core-store/core-state';

import { myPageFeatureKey } from './my-page-store/my-page-state';
import * as MyPageStore from '@we-met-app/root-store/my-page-store/my-page-state';

import { administrationFeatureKey } from './administration-store/administration-state';
import * as AdministrationStore from '@we-met-app/root-store/administration-store/administration-state';

import { dictionariesFeatureKey } from './dictionaries-store/dictionaries-state';
import * as DictionariesStore from '@we-met-app/root-store/dictionaries-store/dictionaries-state';

import { purchaseManageFeatureKey } from '@we-met-app/root-store/purchase-manage-store/purchase-manage-state';
import * as PurchaseManageStore from '@we-met-app/root-store/purchase-manage-store/purchase-manage-state';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
    [coreFeatureKey]: CoreStore.CoreState;
    [authFeatureKey]: AuthStore.AuthState;
    [administrationFeatureKey]: AdministrationStore.AdministrationState;
    [dictionariesFeatureKey]: DictionariesStore.DictionariesState;
    [myPageFeatureKey]: MyPageStore.MyPageState;
    [purchaseManageFeatureKey]: PurchaseManageStore.PurchaseManageState;

    router: fromRouter.RouterReducerState<any>;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const ROOT_REDUCERS = new InjectionToken<
    ActionReducerMap<State, Action>
>('Root reducers token', {
    factory: () => ({
        [coreFeatureKey]: CoreStore.reducers,
        [authFeatureKey]: AuthStore.reducers,
        [administrationFeatureKey]: AdministrationStore.reducers,
        [dictionariesFeatureKey]: DictionariesStore.reducers,
        [myPageFeatureKey]: MyPageStore.reducers,
        [purchaseManageFeatureKey]: PurchaseManageStore.reducers,

        router: fromRouter.routerReducer,
    }),
});

export function clearStateMetaReducer(reducer) {
    return function (state: State, action: Action) {
        return reducer(action.type === '[Auth] Logout' ? undefined : state, action);
    }
}

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return (state, action) => {
        const result = reducer(state, action);
        console.groupCollapsed(action.type);
        console.log('prev state', state);
        console.log('action', action);
        console.log('next state', result);
        console.groupEnd();

        return result;
    };
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: [{ auth: ['user'] }],
        rehydrate: true
    })(reducer);
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger, localStorageSyncReducer, clearStateMetaReducer]
    : [localStorageSyncReducer, clearStateMetaReducer];


/**
 * Layout Selectors
 */


/**
 * Router Selectors
 */
export const selectRouter = createFeatureSelector<
    State,
    fromRouter.RouterReducerState
>('router');

export const { selectRouteData } = fromRouter.getSelectors(selectRouter);
