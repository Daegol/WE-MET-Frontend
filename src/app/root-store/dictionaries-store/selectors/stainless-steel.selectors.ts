import { Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { selectDictionariesState } from './dictionaries.selectors';
import * as fromStainlessSteels from '@we-met-app/root-store/dictionaries-store/reducers/stainless-steel.reducer'
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';

export const selectStainlessSteelsState = createSelector(
    selectDictionariesState,
    (state) => state.stainlessSteels
)

export const selectStainlessSteels = createSelector(
    selectStainlessSteelsState,
    fromStainlessSteels.selectAll
)

export const selectStainlessSteelsNames = createSelector(
    selectStainlessSteelsState,
    fromStainlessSteels.selectStainlessSteelsNames
)

export const selectSelectedStainlessSteels = createSelector(
    selectStainlessSteelsState,
    fromStainlessSteels.getSelectedStainlessSteels
)

export const selectStainlessSteelsEntities = createSelector(
    selectStainlessSteelsState,
    fromStainlessSteels.selectEntities
)

export const selectRow = createSelector(
    selectStainlessSteelsState,
    fromStainlessSteels.getSelectedRow
)

export const getStainlessSteelById = () => {
    return createSelector(
        selectStainlessSteelsEntities,
        (entities: Dictionary<SubCategoryDto>, props: { id: number }) => {
            return entities[props.id]
        },
    )
}

export const selectActionsSelectedStainlessSteel = createSelector(
    selectStainlessSteelsState,
    fromStainlessSteels.getActionsSelectedStainlessSteel
)