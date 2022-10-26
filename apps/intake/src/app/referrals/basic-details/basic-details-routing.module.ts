import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicDetailsComponent } from './basic-details.component';


const routes: Routes = [
    { path: '', component: BasicDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BasicDetailsRoutingModule { }