import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GroupViewModel, PersonnelViewModel } from '@we-met-app/api/models';
import { GroupPersonnelViewModel } from '@we-met-app/api/models/group-personnel-view-model';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { PersonnelListActions } from '@we-met-app/administration/actions';
import { administrationPersonnelRoles, trainingAdminRoles } from '@we-met-app/globals/globals';
import { State } from '@we-met-app/root-store/root-state';
import { PersonnelSelectors } from '@we-met-app/root-store';

@Component({
  selector: 'app-personnel-detail-groups-table',
  templateUrl: './personnel-detail-groups-table.component.html',
  styleUrls: ['./personnel-detail-groups-table.component.scss']
})
export class PersonnelDetailGroupsTableComponent implements AfterViewInit, OnInit, OnChanges, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<GroupViewModel>;

  @Input() currentPersonnel: PersonnelViewModel;
  groups: GroupViewModel[];
  groupsPersonnel: GroupPersonnelViewModel[];
  @Input() actionsSelectedPersonnelDetailGroup: GroupViewModel;
  @Input() selectedGroups: GroupPersonnelViewModel[];
  @Output() openAddPopup = new EventEmitter();
  @Output() openEdit = new EventEmitter();
  @Output() openDeletePopup = new EventEmitter<GroupViewModel[]>();
  @Output() selectedGroupsEvent = new EventEmitter<GroupPersonnelViewModel[]>();
  @Output() actionsSelectedPersonnelDetailGroupEvent = new EventEmitter<GroupViewModel>();

  dataSource: MatTableDataSource<GroupViewModel>;
  selection = new SelectionModel<GroupViewModel>(true, []);
  displayedColumns = ['select', 'name', 'actions'];

  private subscription: Subscription = new Subscription();

  private id = this.route.snapshot.params.id;
  administrationPersonnelRoles = administrationPersonnelRoles;
  trainingAdminRoles = trainingAdminRoles;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>) {
    this.selectGroupsPersonnel();
  }

  ngOnInit() {
    this.dispatchGroupsPersonnel();
    this.initDataSource();

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnChanges(): void {
    this.dataSource === undefined ? this.initDataSource() : this.applyChanges();
    this.applySelectionChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  applyChanges(): void {
    if (this.dataSource !== undefined)
      this.setDataSourceData(this.groupsPersonnel);
  }

  private selectGroupsPersonnel(): void {
    this.subscription.add(this.store.select(PersonnelSelectors.selectGroupsPersonnelByPersonnelId(), { id: this.id })
      .subscribe(groupsPersonnel => {
        this.groupsPersonnel = groupsPersonnel;
        this.applyChanges();
        this.applySelectionChanges();
      })
    );
  }

  private dispatchGroupsPersonnel(): void {
    this.store.dispatch(PersonnelListActions.getAllGroupsPersonnel());
  }

  private setDataSourceData(data: GroupViewModel[]): void {
    data ? this.dataSource.data = data : null;
  }

  private applySelectionChanges(): void {
    this.selection?.clear();
    this.selectedGroups?.forEach(x => this.selection?.toggle(x));
  }

  private initDataSource(): void {
    this.dataSource = new MatTableDataSource<GroupViewModel>(this.groupsPersonnel);
  }

  toggleSelected(row: GroupViewModel): void {
    this.selection?.toggle(row);
    this.selectedGroupsEvent.emit(this.selection?.selected);
  }

  openAddGroupPopup(): void {
    this.openAddPopup.emit({ squadronId: this.id });
  }

  openEditGroup(): void {
    this.openEdit.emit();
  }

  openDeleteGroupPopup(row: GroupPersonnelViewModel[]): void {
    this.openDeletePopup.emit(row);
  }

  cancel(): void {
    this.router.navigateByUrl("/administration/personnel");
  }

  emitActionsSelectedPersonnelDetailGroup(row: GroupPersonnelViewModel) {
    this.actionsSelectedPersonnelDetailGroupEvent.emit(row)
  }

  isSelected(group: GroupPersonnelViewModel): boolean {
    return this.selectedGroups?.find(item => item?.id == group?.id)?.id != null;
  }
}
