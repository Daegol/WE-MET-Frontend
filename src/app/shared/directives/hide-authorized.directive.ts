import { Directive, ElementRef, Input } from '@angular/core';
import { AuthGuard } from '@we-met-app/auth/services/auth-guard.service';

@Directive({
    selector: '[hideAuthorized]'
})
export class HideAuthorizedDirective {
    @Input('hideAuthorized')
    set visiblity(roles: string[]) {
        if (this.authGuard.hasPermissions(roles)) {
            this.el.nativeElement.style.display = 'none';
        }
    }

    constructor(private el: ElementRef, private authGuard: AuthGuard) { }
}