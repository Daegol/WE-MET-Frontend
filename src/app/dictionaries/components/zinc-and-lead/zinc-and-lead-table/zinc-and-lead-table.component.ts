import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SubCategoryDto } from '@we-met-app/api/models';
import FilterHelper from '@we-met-app/shared/helpers/filter.helper';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ZincAndLeadFilter } from '@we-met-app/dictionaries/interfaces/zinc-and-lead-filter.interface';
import { noDataFiltersMessage, noDataLoadedMessage } from '@we-met-app/globals/globals';
import { TableHelper } from '@we-met-app/shared/helpers/table.helper';

@Component({
  selector: 'app-zinc-and-lead-table',
  templateUrl: './zinc-and-lead-table.component.html',
  styleUrls: ['./zinc-and-lead-table.component.scss',
    '../../../../styles/global/table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ZincAndLeadTableComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<SubCategoryDto>;

  @Input() zincAndLeads: SubCategoryDto[];
  @Input() globalFilterValue: string;
  @Input() selectedZincAndLeads: SubCategoryDto[];
  @Input() selectedRow: SubCategoryDto;

  @Output() openNewPopup = new EventEmitter();
  @Output() openEditPopup = new EventEmitter();
  @Output() openDeletePopup = new EventEmitter<SubCategoryDto[]>();
  @Output() selectedZincAndLeadsEvent = new EventEmitter<SubCategoryDto[]>();
  @Output() rowSelectedEvent = new EventEmitter<SubCategoryDto>();

  readonly empty = "EMPTY";
  private filteredValues: ZincAndLeadFilter = { global: '' }
  displayedColumns = ['select', 'name', 'actions'];
  dataSource: MatTableDataSource<SubCategoryDto>;
  selection: SelectionModel<SubCategoryDto>;

  constructor() {
    this.selection = new SelectionModel<SubCategoryDto>(true, []);
    this.selectedZincAndLeads?.forEach(zincAndLead => this.selection.toggle(zincAndLead));
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
    this.selectedZincAndLeads.forEach(x => this.selection.toggle(x))
  }

  private initDataSource(): void {
    this.dataSource = new MatTableDataSource<SubCategoryDto>(this.zincAndLeads);
    this.dataSource.filterPredicate = (data: SubCategoryDto, filter: string) => this.filterData(data, filter);
  }

  filterData(data?: SubCategoryDto, filter?: string): boolean {
    let searchString = JSON.parse(filter) as ZincAndLeadFilter;
    let globalExists = this.checkRowExistsGlobally(searchString?.global, data);
    return globalExists;
  }

  private checkRowExistsGlobally(filter?: string, filteredRow?: SubCategoryDto): boolean {
    return filter?.length ? FilterHelper.checkRowIncludes(filter, filteredRow.name) ||
      FilterHelper.checkRowIncludes(filter, filteredRow.name) : true;
  }

  applyChanges(changes: SimpleChanges): void {
    this.setGlobalFilteredValues(changes.globalFilterValue?.currentValue);
    this.setDataSourceData(changes.zincAndLeads?.currentValue);
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
      this.selectedZincAndLeadsEvent.emit(this.selection.selected.filter(item => item.id != row.id));
    } else {
      this.selection?.toggle(row);
      this.selectedZincAndLeadsEvent.emit(this.selection?.selected);
    }
  }

  openNewZincAndLeadPopup(): void {
    this.openNewPopup.emit();
  }

  openEditZincAndLeadPopup(row: SubCategoryDto): void {
    this.openEditPopup.emit(row);
  }

  private emitSelectedRow(): void {
    this.rowSelectedEvent.emit(this.selectedRow);
  }
  selectRow(row: SubCategoryDto): void {
    this.selectedRow = row;
    this.emitSelectedRow();
  }

  openDeleteZincAndLeadPopup(row: SubCategoryDto[]): void {
    this.openDeletePopup.emit(row);
  }

  isSelected(row: SubCategoryDto): boolean {
    return this.selectedZincAndLeads.find(item => item?.id == row?.id)?.id != null;
  }

  getNoDataMessage(): string {
    if (this.filteredValues.global) {
      return noDataFiltersMessage;
    } else {
      return noDataLoadedMessage;
    }
  }
}
