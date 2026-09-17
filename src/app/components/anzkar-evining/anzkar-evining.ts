import { Component, inject, signal } from '@angular/core';
import { GetAzkar } from '../../services/get-azkar';


@Component({
  imports: [],
  selector: 'app-anzkar-evining',
  styleUrl: './anzkar-evining.scss',
  templateUrl: './anzkar-evining.html',
})
export class AnzkarEvining {

   public azkar = inject(GetAzkar);

  public azkarType = signal<string>('evening');

  public azkarData = signal<any[]>([]);

  public isLoading = signal<boolean>(true);

  public isDark = signal<boolean>(false);
  

  public getAzkar() {

    this.azkar.getAzkar(this.azkarType()).subscribe({

      next: (response) => {

        const data = response.map((zekr: any) => ({
          ...zekr,
          originalCount: zekr.count
        }));

        this.azkarData.set(data);
        this.isLoading.set(false);

        console.log(this.azkarData());
      },

      error: (error) => {
        console.log(error);
        this.isLoading.set(false);
      }

    });
  }

  public decreaseCount(zekr: any) {

    if (zekr.count > 0) {
      zekr.count--;
    }

  }

  public undoCount(zekr: any) {

    zekr.count = zekr.originalCount;

  }

  ngOnInit() {
    this.getAzkar();
  }
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
