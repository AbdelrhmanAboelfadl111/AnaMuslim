import { Component, inject, signal } from '@angular/core';
import { GetAzkar } from '../../services/get-azkar';

@Component({
  imports: [],
  selector: 'app-anzkar-morning',
  styleUrl: './anzkar-morning.scss',
  templateUrl: './anzkar-morning.html',
})
export class AnzkarMorning {

  public azkar = inject(GetAzkar);

  public azkarType = signal<string>('morning');
  public azkarData = signal<any[]>([]);
  public isLoading = signal<boolean>(true);

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

}