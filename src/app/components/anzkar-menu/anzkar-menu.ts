import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [NgClass,RouterLink,RouterLinkActive],
  selector: 'app-anzkar-menu',
  styleUrl: './anzkar-menu.scss',
  templateUrl: './anzkar-menu.html',
})
export class AnzkarMenu {
  isShow = signal<boolean>(false);


  ngAfterViewInit(): void {

    setTimeout(() => {
      this.isShow.set(true);
    }, 300);
  }
}
