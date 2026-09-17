import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetSurahs {

    private http = inject(HttpClient);

    private ApiUrl =
        'https://mp3quran.net/api/v3/suwar?language=ar';

    public getSurah() {
        return this.http.get<any>(this.ApiUrl);
    }
}