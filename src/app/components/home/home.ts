import { AfterViewInit, Component, signal } from '@angular/core';

import { NgClass } from '@angular/common';

@Component({
    imports: [NgClass],
    selector: 'app-home',
    styleUrl: './home.scss',
    templateUrl: './home.html',
})
export class Home implements AfterViewInit {

  public isDark = signal<boolean>(false);
    ngAfterViewInit(): void {

        let element = document.querySelector('html');

        if (element) {

            let observer = new MutationObserver(() => {

              if (element.classList.contains('dark-mode')) {
                this.isDark.set(true) ;
                } else {
                this.isDark.set(false) ;
                }

            });

            observer.observe(element, {
                attributes: true,
                attributeFilter: ['class']
            });

        }
    }
}