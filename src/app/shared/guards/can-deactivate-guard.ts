import { HostListener, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UnsavedDialogComponent } from '../components/unsaved-dialog/unsaved-dialog.component';

@Injectable()
export abstract class CanComponentDeactivate {
    abstract canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;

    @HostListener('window:beforeunload', ['$event'])
    unloadHandler() {
        return this.canDeactivate() ? true : false;
    }
}

export abstract class FormCanDeactivate extends CanComponentDeactivate {
    abstract get form(): FormGroup;
    abstract get submitted(): boolean;

    canDeactivate(): boolean {
        return this.submitted || !this.form.dirty;
    }
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    constructor(private dialog: MatDialog) { }
    canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot) {
        if (component.canDeactivate()) {
            return true;
        }
        let dialogRef = this.dialog.open(UnsavedDialogComponent, { data: { route: currentRoute } });
        return dialogRef.afterClosed();
    }
}