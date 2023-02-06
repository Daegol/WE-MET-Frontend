import { Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { selectDictionariesState } from './dictionaries.selectors';
import * as fromSteelScraps from '@we-met-app/root-store/dictionaries-store/reducers/steel-scrap.reducer'
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';

export const selectSteelScrapsState = createSelector(
    selectDictionariesState,
    (state) => state.steelScraps
)

export const selectSteelScraps = createSelector(
    selectSteelScrapsState,
    fromSteelScraps.selectAll
)

export const selectSteelScrapsNames = createSelector(
    selectSteelScrapsState,
    fromSteelScraps.selectSteelScrapsNames
)

export const selectSelectedSteelScraps = createSelector(
    selectSteelScrapsState,
    fromSteelScraps.getSelectedSteelScraps
)

export const selectSteelScrapsEntities = createSelector(
    selectSteelScrapsState,
    fromSteelScraps.selectEntities
)

export const selectRow = createSelector(
    selectSteelScrapsState,
    fromSteelScraps.getSelectedRow
)

export const getSteelScrapById = () => {
    return createSelector(
        selectSteelScrapsEntities,
        (entities: Dictionary<SubCategoryDto>, props: { id: number }) => {
            return entities[props.id]
        },
    )
}

export const selectActionsSelectedSteelScrap = createSelector(
    selectSteelScrapsState,
    fromSteelScraps.getActionsSelectedSteelScrap
)