import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GetAzkar {

    private http = inject(HttpClient);

    private ApiUrl = 'http://anamuslimapi.atwebpages.com/?type=';

    public getAzkar(type:String) {
        return this.http.get<any>(`${this.ApiUrl}${type}`);
    }
}