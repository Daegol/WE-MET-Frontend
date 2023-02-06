import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PersonnelViewModel, SquadronViewModel } from '@we-met-app/api/models';
import FilterHelper from '@we-met-app/shared/helpers/filter.helper';
import { PersonnelFilter } from '@we-met-app/administration/interfaces/personnel-filter.interface';
import { noDataFiltersMessage, noDataLoadedMessage } from '@we-met-app/globals/globals';
import { TableHelper } from '@we-met-app/shared/helpers/table.helper';

@Component({
  selector: 'app-personnel-table',
  templateUrl: './personnel-table.component.html',
  styleUrls: ['./personnel-table.component.scss',
    '../../../../styles/global/table.scss']
})
export class PersonnelTableComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PersonnelViewModel>;

  @Input() squadrons: SquadronViewModel[];
  @Input() personnel: PersonnelViewModel[];

  @Input() globalFilterValue: string;
  @Input() squadronsFilterValue: string;

  @Input() selectedRow: PersonnelViewModel;
  @Input() selectedPersonnels: PersonnelViewModel[];
  @Input() actionsSelectedPersonnel: PersonnelViewModel;

  @Output() openNewPopup = new EventEmitter();
  @Output() openEdit = new EventEmitter();
  @Output() openSetRoles = new EventEmitter();
  @Output() openSetPasswordPopup = new EventEmitter();
  @Output() openDeletePopup = new EventEmitter<PersonnelViewModel[]>();
  @Output() rowSelectedEvent = new EventEmitter<PersonnelViewModel>();
  @Output() actionsSelectedPersonnelEvent = new EventEmitter<PersonnelViewModel>();
  @Output() selectedPersonnelsEvent = new EventEmitter<PersonnelViewModel[]>();

  readonly empty = "EMPTY";
  dataSource: MatTableDataSource<PersonnelViewModel>;
  selection: SelectionModel<PersonnelViewModel>;
  private filteredValues: PersonnelFilter = { squadrons: [], names: [], global: '' }
  displayedColumns = ['select', 'rankShortname', 'firstName', 'lastName', 'email', 'squadronName', 'callsign', 'isPersonnel', 'isLocked', 'actions'];

  constructor() {
    this.selection = new SelectionModel<PersonnelViewModel>(true, []);
    this.selectedPersonnels?.forEach(personnel => this.selection.toggle(personnel));
  }

  ngOnInit() {
    this.setDataSource();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.dataSource === undefined) {
      this.setDataSource();
    } else {
      this.dataSource.data = this.personnel;
      this.applyChanges(changes);
      this.applySelectionChanges();
    }
  }

  ngOnDestroy(): void {
    this.selectedRow = null;
    this.emitSelectedRow();
  }

  private applySelectionChanges(): void {
    this.selection?.clear()
    this.selectedPersonnels.forEach(x => this.selection?.toggle(x))
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.sortingDataAccessor = TableHelper.getSortingDataAccessor(this.sort.direction);
  }

  setDataSource(): void {
    this.dataSource = new MatTableDataSource<PersonnelViewModel>(this.personnel);
    this.dataSource.filterPredicate = (data: PersonnelViewModel, filter: string) => this.filterData(data, filter);
  }

  filterData(data: PersonnelViewModel, filter: string): boolean {
    let searchString = JSON.parse(filter) as PersonnelFilter;
    let squadronExists = FilterHelper.checkRowExists(searchString?.squadrons, data?.squadronName);
    let globalExists = this.checkRowExistsGlobally(searchString?.global, data);
    return squadronExists && globalExists;
  }

  private checkRowExistsGlobally(filter: string, filteredRow: PersonnelViewModel): boolean {
    return filter?.length ? FilterHelper.checkRowIncludes(filter, filteredRow?.firstName) ||
      FilterHelper.checkRowIncludes(filter, filteredRow?.lastName) ||
      FilterHelper.checkRowIncludes(filter, filteredRow?.squadronName) ||
      FilterHelper.checkRowIncludes(filter, filteredRow?.email) ||
      FilterHelper.checkRowIncludes(filter, filteredRow?.callsign) : true;
  }

  applyChanges(changes: SimpleChanges): void {
    this.setGlobalFilteredValues(changes.globalFilterValue?.currentValue);
    this.setSquadronsFilteredValues(changes.squadronsFilterValue?.currentValue);
    this.applyFilter();
  }

  private setGlobalFilteredValues(filterValue: string): void {
    filterValue === "EMPTY" ? this.filteredValues.global = null :
      filterValue ? this.filteredValues.global = filterValue : null;
  }
  private setSquadronsFilteredValues(filterValues: string[]): void {
    filterValues ? this.filteredValues.squadrons = filterValues : null;
  }

  private applyFilter(): void {
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  toggleSelected(row: PersonnelViewModel): void {
    if (this.isSelected(row)) {
      this.selectedPersonnelsEvent.emit(this.selection.selected.filter(item => item.id != row.id));
    } else {
      this.selection?.toggle(row);
      this.selectedPersonnelsEvent.emit(this.selection?.selected);
    }
  }

  selectRow(row: PersonnelViewModel): void {
    if (!this.isAlreadySelected(row)) {
      this.selectedRow = row;
      this.emitSelectedRow();
    }
  }

  isSelected(personnel: PersonnelViewModel): boolean {
    return this.selectedPersonnels.find(item => item?.id == personnel?.id)?.id != null;
  }

  areSelectedItems(): boolean {
    return this.selection.selected.length === 0;
  }

  private isAlreadySelected(row: PersonnelViewModel): boolean {
    return row != null && this.selectedRow == row;
  }

  private emitSelectedRow(): void {
    this.rowSelectedEvent.emit(this.selectedRow);
  }

  openDeletePersonnelPopup(row: PersonnelViewModel[]): void {
    this.openDeletePopup.emit(row);
  }

  openEditPersonnelPopup(id: string): void {
    this.openEdit.emit(id);
  }

  openNewPersonnelPopup(): void {
    this.openNewPopup.emit();
  }

  openSetPersonnelPasswordPopup(): void {
    this.openSetPasswordPopup.emit();
  }

  emitActionsSelectedPersonnel(row: PersonnelViewModel): void {
    this.actionsSelectedPersonnelEvent.emit(row);
  }

  openSetRolesPersonnelPopup(id: string): void {
    this.openSetRoles.emit(id);
  }

  getNoDataMessage(): string {
    if (this.filteredValues.global || this.filteredValues.squadrons.length > 0) {
      return noDataFiltersMessage;
    } else {
      return noDataLoadedMessage;
    }
  }
}
