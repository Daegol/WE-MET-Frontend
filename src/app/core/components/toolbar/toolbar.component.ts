import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Location } from '@angular/common'
import { User } from '@we-met-app/auth/models';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Output() logOut = new EventEmitter();
  @Input() title: string;
  @Input() user: User;

  constructor(private location: Location) {
  }

  return() {
    this.location.back();
  }
}
