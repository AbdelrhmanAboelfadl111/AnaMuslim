import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GetMoshaf {

    public httpReciters = inject(HttpClient);


    public ApiUrl = "https://mp3quran.net/api/v3/reciters?language=ar&reciter=";

    public getMoshaf(reciterId:any) {
        return this.httpReciters.get<any>(`${this.ApiUrl}${reciterId}`);
    }
}
