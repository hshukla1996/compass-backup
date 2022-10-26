import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root",
})
export class LiheapService {
    constructor(private http: HttpClient) { }


    getDrinkingWater(heatingAssit: any) {

        const houseHoldSaveURL = "/api/intake/applyforservices/getliheapproviders";
        return this.http.post(houseHoldSaveURL, heatingAssit);
    }




}