import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';  
import { MyBenefits } from '../../../+state/models/my-benefits/my-benefits.model';
import { linkCaseURL, myBenefitsURL } from '../../constants/Constants';
 

@Injectable({
    providedIn: 'root',
})
export class MyBenefitsService {
    constructor(private http: HttpClient) { }

    getBenefits(): Observable<MyBenefits[]> {
        return this.http
            .get<MyBenefits[]>(myBenefitsURL)
            .pipe(
                map((data: any) => {
                    console.log(data, "data");
                    return data;
                })
            );
    }

    linkCasePost(myBenefits: MyBenefits): Observable<MyBenefits[]> {
        return this.http
            .post(linkCaseURL, { myBenefits})
            .pipe(
                map((data: any) => {
                    console.log(data, "data");
                    return data;
                })
            );
    }
    // addPost(myBenefits: MyBenefits) {
    //     return this.http.post(
    //         `https://crudngrx-default-rtdb.firebaseio.com/posts.json`,
    //         { myBenefits }
    //     );
    // }

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
