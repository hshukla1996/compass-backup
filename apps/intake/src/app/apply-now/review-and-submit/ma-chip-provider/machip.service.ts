import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({ providedIn: "root" })
export class MaChipService {
    constructor(private http: HttpClient) {}
    getHealthCareConverages(data: any) {
        const healthCareCoveragesURL =
            "/api/intake/applyforservices/getroutingprovider";
        return this.http.post(healthCareCoveragesURL, data);
    }
}
