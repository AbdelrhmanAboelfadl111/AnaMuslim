import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [NgClass,RouterLink,RouterLinkActive],
  selector: 'app-live-menu',
  styleUrl: './live-menu.scss',
  templateUrl: './live-menu.html',
})
export class LiveMenu {
  isShow = signal<boolean>(false);


  ngAfterViewInit(): void {

    setTimeout(() => {
      this.isShow.set(true);
    }, 300);
  }
}
