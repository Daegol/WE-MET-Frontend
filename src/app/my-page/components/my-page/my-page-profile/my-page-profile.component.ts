import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@we-met-app/auth/models';

@Component({
  selector: 'app-my-page-profile',
  templateUrl: './my-page-profile.component.html',
  styleUrls: ['./my-page-profile.component.scss']
})
export class MyPageProfileComponent {
  @Input() user: User;
  @Output() openSetPasswordPopup = new EventEmitter();

  constructor() {
  }

  openMyPageSetPasswordPopup(): void {
    this.openSetPasswordPopup.emit();
  }
}
