import { Component } from '@angular/core';
import { NavBar } from '../nav-bar/nav-bar';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';

@Component({
  imports: [NavBar, Footer, SideNavBar, RouterOutlet],
  selector: 'app-main-page',
  styleUrl: './main-page.scss',
  templateUrl: './main-page.html',
})
export class MainPage {}
