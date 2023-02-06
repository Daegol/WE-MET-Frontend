import { Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { selectDictionariesState } from './dictionaries.selectors';
import * as fromAluminums from '@we-met-app/root-store/dictionaries-store/reducers/aluminum.reducer'
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';

export const selectAluminumsState = createSelector(
    selectDictionariesState,
    (state) => state.aluminums
)

export const selectAluminums = createSelector(
    selectAluminumsState,
    fromAluminums.selectAll
)

export const selectAluminumsNames = createSelector(
    selectAluminumsState,
    fromAluminums.selectAluminumsNames
)

export const selectSelectedAluminums = createSelector(
    selectAluminumsState,
    fromAluminums.getSelectedAluminums
)

export const selectAluminumsEntities = createSelector(
    selectAluminumsState,
    fromAluminums.selectEntities
)

export const selectRow = createSelector(
    selectAluminumsState,
    fromAluminums.getSelectedRow
)

export const getAluminumById = () => {
    return createSelector(
        selectAluminumsEntities,
        (entities: Dictionary<SubCategoryDto>, props: { id: number }) => {
            return entities[props.id]
        },
    )
}

export const selectActionsSelectedAluminum = createSelector(
    selectAluminumsState,
    fromAluminums.getActionsSelectedAluminum
)