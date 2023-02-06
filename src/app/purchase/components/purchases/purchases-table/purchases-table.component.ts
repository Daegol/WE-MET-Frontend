import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PurchaseDto } from '@we-met-app/api/models';
import { noDataFiltersMessage, noDataLoadedMessage } from '@we-met-app/globals/globals';
import { PurchasesFilter } from '@we-met-app/purchase/interfaces/purchases-filter.interface';
import FilterHelper from '@we-met-app/shared/helpers/filter.helper';
import { TableHelper } from '@we-met-app/shared/helpers/table.helper';

@Component({
  selector: 'app-purchases-table',
  templateUrl: './purchases-table.component.html',
  styleUrls: ['./purchases-table.component.scss',
    '../../../../styles/global/table.scss']
})
export class PurchasesTableComponent implements AfterViewInit, OnInit, OnChanges, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PurchaseDto>;

  @Input() purchases: PurchaseDto[];
  @Input() isLoadingData: boolean;
  @Input() selectedRow: PurchaseDto;
  @Input() selectedPurchases: PurchaseDto[];

  @Input() globalFilterValue: string;
  @Input() squadronsFilterValue: string;
  @Input() statusesFilterValue: string;

  @Output() openEdit = new EventEmitter();
  @Output() openAdd = new EventEmitter();
  @Output() openNewPopup = new EventEmitter();
  @Output() openEditPopup = new EventEmitter();
  @Output() openDeletePopup = new EventEmitter();
  @Output() rowSelectedEvent = new EventEmitter<PurchaseDto>();
  @Output() selectedPurchasesEvent = new EventEmitter<PurchaseDto[]>();

  readonly empty = "EMPTY";
  private filteredValues: PurchasesFilter = { squadrons: [], statuses: [], global: '' }
  dataSource: MatTableDataSource<PurchaseDto>;

  displayedColumns = ['select', 'squadonName', 'purchaseTypeName', 'tailNumber', 'localizationName', 'purchaseStatusName', 'actions'];
  selection: SelectionModel<PurchaseDto>;

  constructor() {
    this.selection = new SelectionModel<PurchaseDto>(true, []);
    this.selectedPurchases?.forEach(purchase => this.selection.toggle(purchase));
  }

  ngOnInit(): void {
    this.setDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.sortingDataAccessor = TableHelper.getSortingDataAccessor(this.sort.direction);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataSource === undefined) {
      this.setDataSource();
    } else {
      this.dataSource.data = this.purchases;
      this.applyChanges(changes);
      this.applySelectionChanges();
    }
  }

  ngOnDestroy(): void {
    this.selectedRow = null;
    this.emitSelectedRow();
  }

  private applySelectionChanges(): void {
    this.selection?.clear();
    this.selectedPurchases.forEach(x => this.selection?.toggle(x));
  }

  private setDataSource(): void {
    this.dataSource = new MatTableDataSource<PurchaseDto>(this.purchases);
    this.dataSource.filterPredicate = (data: PurchaseDto, filter: string) => this.filterData(data, filter);
  }

  openNewPurchasePopup(): void {
    this.openNewPopup.emit();
  }

  selectRow(row: PurchaseDto): void {
    if (!this.isAlreadySelected(row)) {
      this.selectedRow = row;
      this.emitSelectedRow();
    }
  }

  private isAlreadySelected(row: PurchaseDto): boolean {
    return row != null && this.selectedRow == row;
  }

  private emitSelectedRow(): void {
    this.rowSelectedEvent.emit(this.selectedRow);
  }

  toggleSelected(row: PurchaseDto): void {
    if (this.isSelected(row)) {
      this.selectedPurchasesEvent.emit(this.selection.selected.filter(item => item.id != row.id));
    } else {
      this.selection?.toggle(row);
      this.selectedPurchasesEvent.emit(this.selection?.selected);
    }
  }

  openEditPurchasePopup(id: string): void {
    this.openEditPopup.emit(id);
  }

  openDeletePurchasePopup(purchase: PurchaseDto[]): void {
    this.openDeletePopup.emit(purchase);
  }

  editSelectedRow(id: string): void {
    this.openEdit.emit(id);
  }

  addNewPurchase(): void {
    this.openAdd.emit();
  }

  filterData(data: PurchaseDto, filter: string): boolean {
    let searchString = JSON.parse(filter) as PurchasesFilter;
    let globalExists = this.checkRowExistsGlobally(searchString?.global, data);
    return globalExists;
  }

  private checkRowExistsGlobally(filter: string, filteredRow: PurchaseDto): boolean {
    return filter?.length ? FilterHelper.checkRowIncludes(filter, filteredRow?.clientName) ||
      FilterHelper.checkRowIncludes(filter, filteredRow?.name) : true;
  }

  private applyChanges(changes: SimpleChanges): void {
    this.setDataSourceData(changes.purchases?.currentValue);
    this.setGlobalFilteredValues(changes.globalFilterValue?.currentValue);
    this.setSquadronsFilteredValues(changes.squadronsFilterValue?.currentValue);
    this.setStatusesFilteredValues(changes.statusesFilterValue?.currentValue);
    this.applyFilter();
  }

  private setDataSourceData(data: PurchaseDto[]): void {
    data ? this.dataSource.data = data : null;
  }

  private setGlobalFilteredValues(filterValue: string): void {
    filterValue === "EMPTY" ? this.filteredValues.global = null : filterValue ? this.filteredValues.global = filterValue : null;
  }

  private setSquadronsFilteredValues(filterValues: string[]): void {
    if (filterValues) {
      filterValues?.includes(this.empty) ? this.filteredValues.squadrons = null : this.filteredValues.squadrons = filterValues;
    }
  }

  private setStatusesFilteredValues(filterValues: string[]): void {
    if (filterValues) {
      filterValues?.includes(this.empty) ? this.filteredValues.statuses = null : this.filteredValues.statuses = filterValues;
    }
  }

  private applyFilter(): void {
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  isSelected(purchase: PurchaseDto): boolean {
    return this.selectedPurchases.find(item => item?.id == purchase?.id)?.id != null;
  }

  areSelectedItems(): boolean {
    return this.selection.selected.length === 0;
  }

  getNoDataMessage(): string {
    if (this.filteredValues.global || this.filteredValues.squadrons.length > 0 || this.filteredValues.statuses.length > 0) {
      return noDataFiltersMessage;
    } else {
      return noDataLoadedMessage;
    }
  }

}
