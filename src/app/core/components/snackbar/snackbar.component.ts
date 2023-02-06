import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-snackbar',
    template: ``,
    styles: [``,],
})
export class SnackBarComponent {

    durationTime = 3000;

    constructor(private _snackBar: MatSnackBar) { }

    public showError(message: string): void {
        this._snackBar.open(message, 'zamknij', {
            duration: this.calculateDurationTime(message),
            panelClass: ['error-snackbar']
        })
    }

    public showInfo(message: string): void {
        this._snackBar.open(message, 'zamknij', {
            duration: this.calculateDurationTime(message),
            panelClass: ['info-snackbar']
        })
    }

    public showSuccess(message: string): void {
        this._snackBar.open(message, 'zamknij', {
            duration: this.calculateDurationTime(message),
            panelClass: ['success-snackbar']
        })
    }

    private calculateDurationTime(message: string): number {
        if (message.length < 20) {
            return this.durationTime;
        } else {
            return message.length * 150;
        }
    }
}