import { Component, computed, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  imports: [NgClass,RouterLink,RouterLinkActive],
  selector: 'app-side-nav-bar',
  styleUrl: './side-nav-bar.scss',
  templateUrl: './side-nav-bar.html',
})
export class SideNavBar {
  public isHide: boolean = false;

  private router = inject(Router);

  public hideSideNav() {
    this.isHide = !this.isHide;
  }

  public currentUrl = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event.urlAfterRedirects)
    ),
    {
      initialValue: this.router.url
    }
  );

  public isActive = computed(() =>
    this.currentUrl() === '/azkar' ||
    this.currentUrl() === '/azkarMorning'
  );

}
