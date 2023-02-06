import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dictionaries-filter',
  templateUrl: './dictionaries-filter.component.html',
  styleUrls: ['./dictionaries-filter.component.scss',
    '../../../styles/global/filter.scss'
  ]
})
export class DictionariesFilterComponent implements OnInit {

  @Input() selectedItems: any;

  @Output() globalFilterEvent = new EventEmitter<string>();

  filterParams = this.fb.group({
    global: "",
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setInitialValues();
  }

  ngOnChanges(): void {
    this.selectedItems.length > 0 ? this.filterParams.disable() : this.filterParams.enable();
  }

  private setInitialValues(): void {
    this.filterParams.setValue({
      global: ""
    });
  }

  onGlobalFilterChanged(value: string) {
    value == "" ? this.globalFilterEvent.emit("EMPTY") : this.globalFilterEvent.emit(value);
  }

  private clearFilters() {
    this.filterParams.setValue({
      global: ""
    });
  }

  onClearFilters() {
    this.clearFilters();
    this.globalFilterEvent.emit("EMPTY");
  }
}
