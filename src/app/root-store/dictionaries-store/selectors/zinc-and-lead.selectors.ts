import { Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { selectDictionariesState } from './dictionaries.selectors';
import * as fromZincAndLeads from '@we-met-app/root-store/dictionaries-store/reducers/zinc-and-lead.reducer'
import { SubCategoryDto } from '@we-met-app/api/models/sub-category-dto';

export const selectZincAndLeadsState = createSelector(
    selectDictionariesState,
    (state) => state.zincAndLeads
)

export const selectZincAndLeads = createSelector(
    selectZincAndLeadsState,
    fromZincAndLeads.selectAll
)

export const selectZincAndLeadsNames = createSelector(
    selectZincAndLeadsState,
    fromZincAndLeads.selectZincAndLeadsNames
)

export const selectSelectedZincAndLeads = createSelector(
    selectZincAndLeadsState,
    fromZincAndLeads.getSelectedZincAndLeads
)

export const selectZincAndLeadsEntities = createSelector(
    selectZincAndLeadsState,
    fromZincAndLeads.selectEntities
)

export const selectRow = createSelector(
    selectZincAndLeadsState,
    fromZincAndLeads.getSelectedRow
)

export const getZincAndLeadById = () => {
    return createSelector(
        selectZincAndLeadsEntities,
        (entities: Dictionary<SubCategoryDto>, props: { id: number }) => {
            return entities[props.id]
        },
    )
}

export const selectActionsSelectedZincAndLead = createSelector(
    selectZincAndLeadsState,
    fromZincAndLeads.getActionsSelectedZincAndLead
)