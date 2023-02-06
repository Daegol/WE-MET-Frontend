import { Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { selectDictionariesState } from './dictionaries.selectors';
import * as fromOthers from '@we-met-app/root-store/dictionaries-store/reducers/other.reducer'
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';

export const selectOthersState = createSelector(
    selectDictionariesState,
    (state) => state.others
)

export const selectOthers = createSelector(
    selectOthersState,
    fromOthers.selectAll
)

export const selectOthersNames = createSelector(
    selectOthersState,
    fromOthers.selectOthersNames
)

export const selectSelectedOthers = createSelector(
    selectOthersState,
    fromOthers.getSelectedOthers
)

export const selectOthersEntities = createSelector(
    selectOthersState,
    fromOthers.selectEntities
)

export const selectRow = createSelector(
    selectOthersState,
    fromOthers.getSelectedRow
)

export const getOtherById = () => {
    return createSelector(
        selectOthersEntities,
        (entities: Dictionary<SubCategoryDto>, props: { id: number }) => {
            return entities[props.id]
        },
    )
}

export const selectActionsSelectedOther = createSelector(
    selectOthersState,
    fromOthers.getActionsSelectedOther
)