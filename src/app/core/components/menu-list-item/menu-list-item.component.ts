import { Component, EventEmitter, HostBinding, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavigationItem } from '../navigation/navigation';
import * as fromRoot from '@we-met-app/root-store/root-state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LayoutSelectors } from '@we-met-app/root-store';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnDestroy {
  expanded: boolean = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavigationItem;
  @Input() sidenavExpanded: boolean;
  @Input() depth: number;
  @Output() expand = new EventEmitter();

  private subscription = new Subscription();

  constructor(public router: Router, private store: Store<fromRoot.State>) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
    this.subscription.add(this.store.select(LayoutSelectors.selectCurrentUrl).subscribe((url: string) => {
      if (this.item?.path && url) {
        this.expanded = url.indexOf(`${this.item.path}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onItemSelected(item: NavigationItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.path]);
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
      if (!this.sidenavExpanded) {
        this.expanded = true;
        this.expand.emit();
      }
    }
  }
}
