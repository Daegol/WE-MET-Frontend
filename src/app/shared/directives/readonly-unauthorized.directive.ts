import { Directive, ElementRef, Input } from '@angular/core';
import { AuthGuard } from '@we-met-app/auth/services/auth-guard.service';

@Directive({
    selector: '[readonlyUnauthorized]'
})
export class ReadonlyUnauthaorizedDirective {
    @Input('readonlyUnauthorized')
    set anything(roles: string[]) {
        if (!this.authGuard.hasPermissions(roles)) {
            setTimeout(() => {
                this.el.nativeElement.setAttribute("readOnly", true);
            })
        }
    }
    constructor(private el: ElementRef, private authGuard: AuthGuard) { }
}