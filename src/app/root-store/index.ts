//auth
import * as AuthSelectors from '@we-met-app/root-store/auth-store/selectors/auth.selectors';
import * as LoginSelectors from '@we-met-app/root-store/auth-store/selectors/login.selectors';
import * as LayoutSelectors from '@we-met-app/root-store/core-store/selectors/layout.selectors';

//administration
import * as PersonnelSelectors from '@we-met-app/root-store/administration-store/selectors/personnel.selectors';
import * as PersonnelReducer from '@we-met-app/root-store/administration-store/reducers/personnel.reducer';

//dictionaries
import * as SteelScrapSelectors from '@we-met-app/root-store/dictionaries-store/selectors/steel-scrap.selectors';
import * as SteelScrapReducer from '@we-met-app/root-store/dictionaries-store/reducers/steel-scrap.reducer';
import * as AluminumSelectors from '@we-met-app/root-store/dictionaries-store/selectors/aluminum.selectors';
import * as AluminumReducer from '@we-met-app/root-store/dictionaries-store/reducers/aluminum.reducer';
import * as StainlessSteelSelectors from '@we-met-app/root-store/dictionaries-store/selectors/stainless-steel.selectors';
import * as StainlessSteelReducer from '@we-met-app/root-store/dictionaries-store/reducers/stainless-steel.reducer';
import * as CopperSelectors from '@we-met-app/root-store/dictionaries-store/selectors/copper.selectors';
import * as CopperReducer from '@we-met-app/root-store/dictionaries-store/reducers/copper.reducer';
import * as BrassSelectors from '@we-met-app/root-store/dictionaries-store/selectors/brass.selectors';
import * as BrassReducer from '@we-met-app/root-store/dictionaries-store/reducers/brass.reducer';
import * as ZincAndLeadSelectors from '@we-met-app/root-store/dictionaries-store/selectors/zinc-and-lead.selectors';
import * as ZincAndLeadReducer from '@we-met-app/root-store/dictionaries-store/reducers/zinc-and-lead.reducer';
import * as OtherSelectors from '@we-met-app/root-store/dictionaries-store/selectors/other.selectors';
import * as OtherReducer from '@we-met-app/root-store/dictionaries-store/reducers/other.reducer';

//purchase
import * as PurchasesSelectors from '@we-met-app/root-store/purchase-manage-store/selectors/purchases.selectors';
import * as PurchasesReducer from '@we-met-app/root-store/purchase-manage-store/reducers/purchases.reducer';

//stores
import * as RootStore from '@we-met-app/root-store/root-state';
import * as AuthStore from '@we-met-app/root-store/auth-store/auth-state';
import * as CoreStore from '@we-met-app/root-store/core-store/core-state';
import * as MyPageStore from '@we-met-app/root-store/my-page-store/my-page-state';
import * as AdministrationStore from '@we-met-app/root-store/administration-store/administration-state';
import * as DictionariesStore from '@we-met-app/root-store/dictionaries-store/dictionaries-state';
import * as PurchaseManageStore from '@we-met-app/root-store/purchase-manage-store/purchase-manage-state'

//export selectors
export {
    AuthSelectors,
    LoginSelectors,
    LayoutSelectors,

    PersonnelSelectors,
    SteelScrapSelectors,
    AluminumSelectors,
    StainlessSteelSelectors,
    CopperSelectors,
    BrassSelectors,
    ZincAndLeadSelectors,
    OtherSelectors,

    PurchasesSelectors
}

//export reducers
export {
    PersonnelReducer,
    SteelScrapReducer,
    AluminumReducer,
    StainlessSteelReducer,
    CopperReducer,
    BrassReducer,
    ZincAndLeadReducer,
    OtherReducer,

    PurchasesReducer
}

//export stores
export {
    RootStore,
    AuthStore,
    CoreStore,
    AdministrationStore,
    DictionariesStore,
    MyPageStore,
    PurchaseManageStore
}
