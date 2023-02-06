import { Action, combineReducers } from '@ngrx/store';
import { aluminumReducer, AluminumState } from './reducers/aluminum.reducer';
import { brassReducer, BrassState } from './reducers/brass.reducer';
import { CopperState, copperReducer } from './reducers/copper.reducer';
import { stainlessSteelReducer, StainlessSteelState } from './reducers/stainless-steel.reducer';
import { steelScrapReducer, SteelScrapState } from './reducers/steel-scrap.reducer';
import { zincAndLeadReducer, ZincAndLeadState } from './reducers/zinc-and-lead.reducer';
import { otherReducer, OtherState } from './reducers/other.reducer';

export const dictionariesFeatureKey = 'dictionaries';
export const steelScrapFeatureKey = 'steelScraps';
export const aluminumFeatureKey = 'aluminums';
export const stainlessSteelFeatureKey = 'stainlessSteels';
export const copperFeatureKey = 'coppers';
export const brassFeatureKey = 'brasses';
export const zincAndLeadFeatureKey = 'zincAndLeads';
export const otherFeatureKey = 'others';

export interface DictionariesState {
    [steelScrapFeatureKey]: SteelScrapState;
    [aluminumFeatureKey]: AluminumState;
    [stainlessSteelFeatureKey]: StainlessSteelState;
    [copperFeatureKey]: CopperState;
    [brassFeatureKey]: BrassState;
    [zincAndLeadFeatureKey]: ZincAndLeadState;
    [otherFeatureKey]: OtherState;
}

export function reducers(state: DictionariesState | undefined, action: Action) {
    return combineReducers({
        [steelScrapFeatureKey]: steelScrapReducer,
        [aluminumFeatureKey]: aluminumReducer,
        [stainlessSteelFeatureKey]: stainlessSteelReducer,
        [copperFeatureKey]: copperReducer,
        [brassFeatureKey]: brassReducer,
        [zincAndLeadFeatureKey]: zincAndLeadReducer,
        [otherFeatureKey]: otherReducer
    })(state, action);
}