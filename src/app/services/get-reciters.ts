import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GetReciters {

    public httpReciters = inject(HttpClient);

    public ApiUrl = "https://www.mp3quran.net/api/v3/reciters?language=ar";

    public getReciters() {
        return this.httpReciters.get<any>(this.ApiUrl);
    }
}
