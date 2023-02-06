import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LocalizationViewModel, SquadronViewModel } from '@we-met-app/api/models';
import { PersonnelParams } from '@we-met-app/root-store/administration-store/reducers/personnel.reducer';

@Component({
  selector: 'app-personnel-filter',
  templateUrl: './personnel-filter.component.html',
  styleUrls: ['./personnel-filter.component.scss',
    '../../../../styles/global/filter.scss']
})
export class PersonnelFilterComponent implements OnChanges, AfterViewInit {
  @Input() squadronsNames: SquadronViewModel[];
  @Input() personnelParamsData: PersonnelParams;
  @Input() selectedPersonnels: LocalizationViewModel[];

  @Output() globalFilterEvent = new EventEmitter<string>();
  @Output() squadronsFilterEvent = new EventEmitter<string[]>();

  filterParams = this.fb.group({
    global: "",
    selectedSquadrons: []
  });

  constructor(private fb: FormBuilder) { }

  ngOnChanges(): void {
    this.selectedPersonnels.length > 0 ? this.filterParams.disable() : this.filterParams.enable();
  }

  ngOnInit(): void {
    this.setInitialValues();
  }

  ngAfterViewInit(): void {
    this.squadronsFilterAfterInit(this.filterParams.value.selectedSquadrons);
  }

  private squadronsFilterAfterInit(value): void {
    this.squadronsFilterEvent.emit(value);
  }

  private setInitialValues(): void {
    if (this.personnelParamsData !== undefined) {
      this.filterParams.setValue({
        global: "",
        selectedSquadrons: this.personnelParamsData.currentSquadronIds
      });
    }
  }

  private clearFilters() {
    this.filterParams.setValue({
      global: "",
      selectedSquadrons: []
    });
  }

  onGlobalFilterChanged(value: string): void {
    value == "" ? this.globalFilterEvent.emit("EMPTY") : this.globalFilterEvent.emit(value);
  }

  onSquadronsFilterChanged(event): void {
    this.squadronsFilterEvent.emit(event?.value);
  }

  onClearFilters(): void {
    this.clearFilters();
    this.squadronsFilterEvent.emit([]);
    this.globalFilterEvent.emit("EMPTY");
  }
}
