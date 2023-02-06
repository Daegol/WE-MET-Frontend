import { User } from '../../../auth/models/user';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LayoutActions } from '@we-met-app/core/actions';
import { NavigationItem, NAVIGATION_ITEMS } from '@we-met-app/core/components/navigation/navigation';
import { Event, NavigationEnd, Router } from '@angular/router';
import { State } from '@we-met-app/root-store/root-state';
import { AuthSelectors } from '@we-met-app/root-store';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
    navigationItems: NavigationItem[];
    @Input() showSidenav: boolean;
    @Input() sidenavExpanded: boolean;
    private subscription = new Subscription();
    navItems: NavigationItem[] = NAVIGATION_ITEMS;
    divStyle = "'visible'";

    constructor(private store: Store<State>, private router: Router) {
        this.subscription.add(this.router.events.subscribe(
            (event: Event) => {
                if (event instanceof NavigationEnd) {
                    this.store.dispatch(LayoutActions.setCurrentUrl({ url: event.urlAfterRedirects }));
                }
            }));
    }

    ngOnInit() {
        this.setNavigationItems();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private setNavigationItems(): void {
        this.navItems.forEach(item => item.disabled = true);

        this.subscription.add(this.store.select(AuthSelectors.selectUser).subscribe((user) => {
            if (user?.decodedToken?.roles != null) {
                this.navItems.forEach((item: NavigationItem) => {
                    if (item != null) {
                        if (this.hasPermissions(user?.decodedToken?.roles, item.roles)) {
                            item.disabled = false;
                            this.setChildrenNavItems(item, user);
                        } else {
                            item.disabled = true;
                        }
                    }
                })
            }


        }));


        // var items = [];
        //TODO - after logout NAVIGATION_ITEMS stays changed due to item.children = ...
        //itemCopy - this way menu fails to expand properly after login, but children are load correctly when changed from user to admin account
        // NAVIGATION_ITEMS.forEach((item: NavigationItem) => {
        //     if (this.hasPermissions(user?.decodedToken.role, item.roles)) {
        //         item.children = this.getChildrenList(user?.decodedToken?.role, item);
        //         items.push(item);
        //     }
        // let itemCopy = {
        //     path: item.path,
        //     name: item.name,
        //     icon: item.icon,
        //     id: item.id,
        //     children: item.children,
        //     roles: item.roles
        // }
        // if (this.hasPermissions(user?.decodedToken.role, itemCopy.roles)) {
        //     itemCopy.children = this.getChildrenList(user?.decodedToken?.role, itemCopy);
        //     items.push(itemCopy);
        // }
        //     })
        //     this.navigationItems = items;
        // }));
    }

    private setChildrenNavItems(item: NavigationItem, user: User) {
        if (item.children != null) {
            item.children.forEach(child => {
                child.disabled = this.hasPermissions(user?.decodedToken?.roles, child?.roles) ? false : true;
            })
        }
    }
    private hasPermissions(ownRoles: string[], requiredRoles: string[]): boolean {
        return ownRoles != undefined ? requiredRoles?.every(roles => ownRoles?.includes(roles)) || requiredRoles.length == 0 : true;
        //TODO: When user is undefined navigation item that has roles is removed from list -> returns false

        //return requiredRoles.some(role => ownRoles?.includes(role)) || requiredRoles.length == 0;
    }

    // private getChildrenList(userRoles: string[], item: NavigationItem): NavigationItem[] {
    //     var list = [];
    //     item.children.forEach(child => {
    //         if (this.hasPermissions(userRoles, child.roles)) {
    //             list.push(child);
    //         }
    //     })
    //     return list;
    // }

    // private hasPermissions(ownRoles: string[], requiredRoles: string[]): boolean {
    //     //TODO: When user is undefined navigation item that has roles is removed from list -> returns false
    //     return ownRoles != undefined ? requiredRoles.some(role => ownRoles?.includes(role)) || requiredRoles.length == 0 : true;
    //     //return requiredRoles.some(role => ownRoles?.includes(role)) || requiredRoles.length == 0;
    // }

    openSidenav() {
        this.store.dispatch(LayoutActions.openSidenav());
    }

    toggleSidenav() {
        this.store.dispatch(LayoutActions.toggleSidenav());
    }
}