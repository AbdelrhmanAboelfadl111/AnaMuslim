import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetReciters } from '../../services/get-reciters';
import { GetMoshaf } from '../../services/get-moshaf';
import { GetSurahs } from '../../services/get-sora';


@Component({
  imports: [FormsModule,CommonModule],
  selector: 'app-quran-sound',
  styleUrl: './quran-sound.scss',
  templateUrl: './quran-sound.html',
})
export class QuranSound {

  public isShow = signal<boolean>(false);

  public recitersData = inject(GetReciters);

  public moshafData = inject(GetMoshaf);

  public soraData = inject(GetSurahs);

  public recitersArray: any[] = [];
  
  public moshafArray:any [] = [];

  public isUserSearchRecitersInput = signal<boolean>(false);

  public isUserSearchRecitersType = signal<boolean>(false);

  public openedList = signal<string | null>(null);

  public selectedReciterName = signal<string>("");

  public selectedReciterId = signal<string>("");

  public selectedRewayaValue = signal<string>("");

  public selectedRewayaId = signal<string>("");

  public availableSoraList = signal<any[]>([]);

  public availableSoraAll = signal<any[]>([]);

  public availableSoraToChoice = signal<any[]>([]);

  public selectedSoraValue = signal<string>("");

  public selectedSoraData = signal<object>({});

  public selectedRewayaData = signal<object>({});

  public selectedRewayaServer = signal<string>("");

  public selectedSoraId = signal<string>("");

  public selectedSoraIdServerForm = signal<string>("");

  public server = signal<string>("");

  public reciterSearch = signal<string>("");

  public rewayaSearch = signal<string>("");

  public soraSearch = signal<string>("");

  public filteredReciters = signal<any[]>([]);

  public filteredRewaya = signal<any[]>([]);

  public filteredSora = signal<any[]>([]);

  public isDataCompleted = signal<boolean>(false);

  public CanGetServer = signal<boolean>(false);

  
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  public isUserNotSearchRecitersAction() {
    this.isUserSearchRecitersInput.set(false);
  };

  public searchReciters(e: Event) {
    if (e.target instanceof HTMLInputElement) {

      this.clearServer();

      e.target.value = e.target.value.replace(/[^\u0600-\u06FF\s]/g, '');

      let currentValue = e.target.value.trim();

      this.reciterSearch.set(currentValue);

      let selectedValue = this.selectedReciterName().trim();

      if (currentValue !== selectedValue) {
        this.clearSelectedReciter();
      }

      this.isUserSearchRecitersType.set(currentValue !== "");

      this.filteredReciters.set(
        this.recitersArray.filter((reciter) =>
          reciter.name.includes(currentValue)
        )
      );
    }
  };

  public searchRewaya(e: Event) {
    if (e.target instanceof HTMLInputElement) {
    
      e.target.value = e.target.value.replace(/[^\u0600-\u06FF\s]/g, '');
      
      this.clearServer();

    let currentValue = e.target.value.trim();

      this.rewayaSearch.set(currentValue);
      
      let selectedValue = this.selectedRewayaValue().trim();

      if (currentValue !== selectedValue) {
        this.clearSelectedReciter();
      }

    this.filteredRewaya.set(
      this.moshafArray.filter((rewaya) =>
        rewaya.name.includes(currentValue)
      )
    );
  }
  };

  public openList(listName: string) {
    this.openedList.set(listName);
  };

  public searchSora(e: Event) {
    if (e.target instanceof HTMLInputElement) {

      this.clearServer();
    
      e.target.value = e.target.value.replace(/[^\u0600-\u06FF\s]/g, '');

    let currentValue = e.target.value.trim();

      this.soraSearch.set(currentValue);

      let selectedValue = this.selectedSoraValue().trim();
      
      if (currentValue !== selectedValue) {
        this.clearSelectedReciter();
        this.server.set("");
      }

    this.filteredSora.set(
      this.availableSoraToChoice().filter((sora) =>
        sora.name.includes(currentValue)
      )
    );
  }
  };

  public closeLists() {
    this.openedList.set(null);
  };

  public selectedReciter(element: any) {
    this.selectedReciterName.set(element.name);
    this.selectedReciterId.set(element.id);
    this.clearServer();


    this.selectedRewayaValue.set("");
    this.selectedRewayaId.set("");
    this.moshafArray = [];
    this.filteredRewaya.set([]);

    this.selectedSoraValue.set("");
    this.selectedSoraId.set("");
    this.selectedSoraData.set({}); 
    this.server.set("");

    
    this.moshafData.getMoshaf(this.selectedReciterId()).subscribe({
      next: (response) => {
        this.moshafArray = response.reciters[0].moshaf;
        this.filteredRewaya.set(this.moshafArray);
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.closeLists();
  };

  public selectedRewaya(element: any) {
    this.selectedRewayaValue.set(element.name);
    this.selectedRewayaId.set(element.rewaya_id);
    this.selectedSoraValue.set("");
    this.selectedSoraId.set("");
    this.selectedSoraData.set({});
    this.server.set("");
    this.availableSoraList.set(element.surah_list.split(",").map(Number));
    this.selectedRewayaData.set(element);
    this.selectedRewayaServer.set(element.server);
    this.clearServer();
    this.closeLists();
    this.soraData.getSurah().subscribe({
      next: (response) => {
        this.availableSoraAll.set(response.suwar);

        this.availableSoraToChoice.set(this.availableSoraAll().filter((availableSura) => {
          return this.availableSoraList().includes(availableSura.id);
        }));

        this.filteredSora.set(this.availableSoraToChoice());

      },
      error: (error) => {
        console.log(error);
      }
    })
  };

  public selectedSora(sora:any) {
    this.selectedSoraValue.set(sora.name);
    this.selectedSoraData.set(sora);
    this.selectedSoraId.set(sora.id);
    this.closeLists();
    this.isComplete();
  };

  public reset() {
    this.selectedReciterName.set("");
    this.selectedReciterId.set("");
  };

  public clearSelectedReciter() {
    this.selectedReciterId.set("");
    this.selectedRewayaValue.set("");
    this.selectedRewayaId.set("");
    this.availableSoraToChoice.set([]);
    this.selectedSoraValue.set("");
    this.server.set("");
    this.moshafArray = [];
  };

  public getServer() {
    if (this.CanGetServer()) {
      this.selectedSoraIdServerForm.set(String(String(this.selectedSoraId()).padStart(3, "0")));

      this.server.set(this.selectedRewayaServer().concat(this.selectedSoraIdServerForm()).concat(".mp3"));
    }
    

  };

  public isComplete() {
  if (
    this.selectedReciterId() == "" ||
    this.selectedRewayaId() == "" ||
    this.selectedSoraId() == ""
  ) {
    this.clearServer();
  } else {
    this.isDataCompleted.set(true);
    this.CanGetServer.set(true);
  }
  };

  public clearServer() {
    this.server.set("");
    this.CanGetServer.set(false);
    this.isDataCompleted.set(false);
  }




  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  ngOnInit() {
    this.recitersData.getReciters().subscribe({
      next: (response) => {
        this.recitersArray = response.reciters;
        this.filteredReciters.set(response.reciters);
      },
      error: (error) => {
        console.log(error);
      }
    })
  };

  @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event) {
      let target = event.target as HTMLElement;
      if (
          target.closest('.InputBox') ||
          target.closest('.listOptions')
      ) {
          return;
      }
      this.closeLists();
  }
  
  ngAfterViewInit(): void {

    setTimeout(() => {
      this.isShow.set(true);
    }, 300);
  }



}
