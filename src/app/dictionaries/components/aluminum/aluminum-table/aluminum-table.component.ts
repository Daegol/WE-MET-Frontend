import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SubCategoryDto } from '@we-met-app/api/models';
import FilterHelper from '@we-met-app/shared/helpers/filter.helper';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AluminumFilter } from '@we-met-app/dictionaries/interfaces/aluminum-filter.interface';
import { noDataFiltersMessage, noDataLoadedMessage } from '@we-met-app/globals/globals';
import { TableHelper } from '@we-met-app/shared/helpers/table.helper';

@Component({
  selector: 'app-aluminum-table',
  templateUrl: './aluminum-table.component.html',
  styleUrls: ['./aluminum-table.component.scss',
    '../../../../styles/global/table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AluminumTableComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<SubCategoryDto>;

  @Input() aluminums: SubCategoryDto[];
  @Input() globalFilterValue: string;
  @Input() selectedAluminums: SubCategoryDto[];
  @Input() selectedRow: SubCategoryDto;

  @Output() openNewPopup = new EventEmitter();
  @Output() openEditPopup = new EventEmitter();
  @Output() openDeletePopup = new EventEmitter<SubCategoryDto[]>();
  @Output() selectedAluminumsEvent = new EventEmitter<SubCategoryDto[]>();
  @Output() rowSelectedEvent = new EventEmitter<SubCategoryDto>();

  readonly empty = "EMPTY";
  private filteredValues: AluminumFilter = { global: '' }
  displayedColumns = ['select', 'name', 'actions'];
  dataSource: MatTableDataSource<SubCategoryDto>;
  selection: SelectionModel<SubCategoryDto>;

  constructor() {
    this.selection = new SelectionModel<SubCategoryDto>(true, []);
    this.selectedAluminums?.forEach(aluminum => this.selection.toggle(aluminum));
  }

  ngOnInit() {
    this.initDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.sortingDataAccessor = TableHelper.getSortingDataAccessor(this.sort.direction);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource === undefined ? this.initDataSource() : this.applyChanges(changes);
    this.applySelectionChanges();
  }

  private applySelectionChanges(): void {
    this.selection.clear()
    this.selectedAluminums.forEach(x => this.selection.toggle(x))
  }

  private initDataSource(): void {
    this.dataSource = new MatTableDataSource<SubCategoryDto>(this.aluminums);
    this.dataSource.filterPredicate = (data: SubCategoryDto, filter: string) => this.filterData(data, filter);
  }

  filterData(data?: SubCategoryDto, filter?: string): boolean {
    let searchString = JSON.parse(filter) as AluminumFilter;
    let globalExists = this.checkRowExistsGlobally(searchString?.global, data);
    return globalExists;
  }

  private checkRowExistsGlobally(filter?: string, filteredRow?: SubCategoryDto): boolean {
    return filter?.length ? FilterHelper.checkRowIncludes(filter, filteredRow.name) ||
      FilterHelper.checkRowIncludes(filter, filteredRow.name) : true;
  }

  applyChanges(changes: SimpleChanges): void {
    this.setGlobalFilteredValues(changes.globalFilterValue?.currentValue);
    this.setDataSourceData(changes.aluminums?.currentValue);
    this.applyFilter();
  }

  private setDataSourceData(data?: SubCategoryDto[]): void {
    data ? this.dataSource.data = data : null;
  }

  private setGlobalFilteredValues(filterValue?: string): void {
    filterValue === "EMPTY" ? this.filteredValues.global = null : filterValue ? this.filteredValues.global = filterValue : null;
  }

  private applyFilter(): void {
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  toggleSelected(row?: SubCategoryDto): void {
    if (this.isSelected(row)) {
      this.selectedAluminumsEvent.emit(this.selection.selected.filter(item => item.id != row.id));
    } else {
      this.selection?.toggle(row);
      this.selectedAluminumsEvent.emit(this.selection?.selected);
    }
  }

  openNewAluminumPopup(): void {
    this.openNewPopup.emit();
  }

  openEditAluminumPopup(row: SubCategoryDto): void {
    this.openEditPopup.emit(row);
  }

  private emitSelectedRow(): void {
    this.rowSelectedEvent.emit(this.selectedRow);
  }
  selectRow(row: SubCategoryDto): void {
    this.selectedRow = row;
    this.emitSelectedRow();
  }

  openDeleteAluminumPopup(row: SubCategoryDto[]): void {
    this.openDeletePopup.emit(row);
  }

  isSelected(row: SubCategoryDto): boolean {
    return this.selectedAluminums.find(item => item?.id == row?.id)?.id != null;
  }

  getNoDataMessage(): string {
    if (this.filteredValues.global) {
      return noDataFiltersMessage;
    } else {
      return noDataLoadedMessage;
    }
  }
}
