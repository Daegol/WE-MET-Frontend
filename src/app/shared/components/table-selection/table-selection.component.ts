import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-selection',
  templateUrl: './table-selection.component.html',
  styleUrls: ['./table-selection.component.scss'],
  animations: [
    trigger(
      'inOutAnimationLeft',
      [transition(
        ':enter',
        [
          style({ transform: 'translateX(-100%)' }),
          animate('0.2s ease-out',
            style({ transform: 'translateX(0)' }))
        ]
      ),
      transition(':leave',
        [
          style({ transform: 'translateX(0)' }),
          animate('0.2s ease-in',
            style({ transform: 'translateX(-100%)' }))
        ])]
    )
  ]
})
export class TableSelectionComponent {
  @Input() selectedItems: any;
  @Output() closeEvent = new EventEmitter();

  constructor() { }

  emitCloseEvent(): void {
    this.closeEvent.emit();
  }
}
