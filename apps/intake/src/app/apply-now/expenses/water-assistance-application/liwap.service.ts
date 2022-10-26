import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root",
})
export class LiwapService {
    constructor(private http: HttpClient) { }


    getDrinkingWater(dw: any) {
       
        const houseHoldSaveURL = "/api/intake/applyforservices/getlihwapproviders";
        return this.http.post(houseHoldSaveURL, dw);
    }




}