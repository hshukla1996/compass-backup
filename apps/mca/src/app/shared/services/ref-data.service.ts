import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { MyBenefits } from '../../+state/models/my-benefits/my-benefits.model';

@Injectable({
    providedIn: 'root',
})
export class RefDataService {
    constructor(private http: HttpClient) { }

    getCounties(): Observable<any[]> {
        return this.http
            .get<any[]>(`http://localhost:3000/posts`)
            .pipe(
                map((data: any) => {
                    return data;
                })
            );
    }

    addPost(myBenefits: MyBenefits) {
        return this.http.post(
            `https://crudngrx-default-rtdb.firebaseio.com/posts.json`,
            { myBenefits }
        );
    }

    updatePost(myBenefits: any) {
        const postData = {
            [myBenefits.id]: { title: myBenefits.title, description: myBenefits.description },
        };
        return this.http.patch(
            `https://crudngrx-default-rtdb.firebaseio.com/posts.json`,
            { postData }
        );
    }

    deletePost(id: string) {
        return this.http.delete(
            `https://crudngrx-default-rtdb.firebaseio.com/posts/${id}.json`
        );
    }
}
