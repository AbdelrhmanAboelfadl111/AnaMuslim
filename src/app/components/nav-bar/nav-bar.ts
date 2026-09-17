import { Component, computed, inject } from '@angular/core';
import { Home } from '../home/home';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  imports: [Home,RouterLink,RouterLinkActive],
  selector: 'app-nav-bar',
  styleUrl: './nav-bar.scss',
  templateUrl: './nav-bar.html',
})
export class NavBar {

  public IsshowSideNavBarMobile: boolean = false;
  
  public isDark = false;

  private router = inject(Router);






  public toggleTheme() {
    this.isDark = !this.isDark;
    document.documentElement.classList.toggle('dark-mode');
  };

  public showSideNavBarMobile() {
    this.IsshowSideNavBarMobile = !this.IsshowSideNavBarMobile;
  };

  public currentUrl = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event.urlAfterRedirects)
    ),
    {
      initialValue: this.router.url
    }
  );

  public isAzkarActive = computed(() =>
    this.currentUrl() === '/azkar' ||
    this.currentUrl() === '/azkarMorning'||
    this.currentUrl() === '/azkarEvening'
  );

  public isLiveActive = computed(() => this.currentUrl() === '/liveMenu');

}
