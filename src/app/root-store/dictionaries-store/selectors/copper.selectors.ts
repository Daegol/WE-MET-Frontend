import { Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { selectDictionariesState } from './dictionaries.selectors';
import * as fromCoppers from '@we-met-app/root-store/dictionaries-store/reducers/copper.reducer'
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';

export const selectCoppersState = createSelector(
    selectDictionariesState,
    (state) => state.coppers
)

export const selectCoppers = createSelector(
    selectCoppersState,
    fromCoppers.selectAll
)

export const selectCoppersNames = createSelector(
    selectCoppersState,
    fromCoppers.selectCoppersNames
)

export const selectSelectedCoppers = createSelector(
    selectCoppersState,
    fromCoppers.getSelectedCoppers
)

export const selectCoppersEntities = createSelector(
    selectCoppersState,
    fromCoppers.selectEntities
)

export const selectRow = createSelector(
    selectCoppersState,
    fromCoppers.getSelectedRow
)

export const getCopperById = () => {
    return createSelector(
        selectCoppersEntities,
        (entities: Dictionary<SubCategoryDto>, props: { id: number }) => {
            return entities[props.id]
        },
    )
}

export const selectActionsSelectedCopper = createSelector(
    selectCoppersState,
    fromCoppers.getActionsSelectedCopper
)