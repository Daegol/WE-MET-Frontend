import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Location } from '@angular/common'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-unsaved-dialog',
  templateUrl: './unsaved-dialog.component.html',
  styleUrls: ['./unsaved-dialog.component.scss']
})
export class UnsavedDialogComponent implements OnInit {
  private currentRoute = null;

  constructor(private router: Router,
    private location: Location,
    private dialogRef: MatDialogRef<UnsavedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { route: ActivatedRouteSnapshot }) {
    this.currentRoute = data?.route;
  }

  ngOnInit(): void {
  }

  cancel() {
    if (this.currentRoute != null) {
      const currentUrlTree = this.router.createUrlTree([], this.currentRoute);
      const currentUrl = currentUrlTree.toString();
      this.location.go(currentUrl);
    }
    this.dialogRef.close(false);
  }
}
