import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bc-setup-page',
  template: `
    <mat-card>
      <mat-card-title>SETUP PAGE</mat-card-title>
    </mat-card>

  `,
  /**
   * Container components are permitted to have just enough styles
   * to bring the view together. If the number of styles grow,
   * consider breaking them out into presentational
   * components.
   */
  styles: [
    `
      mat-card-title {
        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class AdministrationPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }
}
