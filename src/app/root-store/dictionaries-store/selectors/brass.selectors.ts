import { Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { selectDictionariesState } from './dictionaries.selectors';
import * as fromBrasss from '@we-met-app/root-store/dictionaries-store/reducers/brass.reducer'
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';

export const selectBrasssState = createSelector(
    selectDictionariesState,
    (state) => state.brasses
)

export const selectBrasss = createSelector(
    selectBrasssState,
    fromBrasss.selectAll
)

export const selectBrasssNames = createSelector(
    selectBrasssState,
    fromBrasss.selectBrasssNames
)

export const selectSelectedBrasss = createSelector(
    selectBrasssState,
    fromBrasss.getSelectedBrasss
)

export const selectBrasssEntities = createSelector(
    selectBrasssState,
    fromBrasss.selectEntities
)

export const selectRow = createSelector(
    selectBrasssState,
    fromBrasss.getSelectedRow
)

export const getBrassById = () => {
    return createSelector(
        selectBrasssEntities,
        (entities: Dictionary<SubCategoryDto>, props: { id: number }) => {
            return entities[props.id]
        },
    )
}

export const selectActionsSelectedBrass = createSelector(
    selectBrasssState,
    fromBrasss.getActionsSelectedBrass
)