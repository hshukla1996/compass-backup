import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class HttpCacheService {

    constructor() {}

    put(tableName: string, response: any): void {
        let startupJSON = { timestamp: new Date()}
        let referenceTables = JSON.parse(localStorage.getItem("ReferenceTables") ?? JSON.stringify(startupJSON))
        referenceTables[tableName] = response
        let objectWeSave = JSON.stringify(referenceTables);
        localStorage.setItem("ReferenceTables", objectWeSave);
    }

    hasStorageExpired(): boolean {
        if (!localStorage.getItem("ReferenceTables")) return true
        let timestamp: Date = new Date(JSON.parse(localStorage.getItem("ReferenceTables")!)["timestamp"])
        return false // TODO check timestamp against rules
    } 

    resetCache(): void {
        localStorage.removeItem("ReferenceTables")
    }

    get(url: string): HttpResponse<any> {
        let storage = localStorage.getItem("ReferenceTables")
        if (storage) {
            let retVal = new HttpResponse<any>(JSON.parse(storage)[url] ?? "")
            return retVal
        }
        else return new HttpResponse<any>()
    }
}
