import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoreInfoComponent } from './more-info.component';

const routes: Routes = [
    { path: '', component: MoreInfoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MoreInfoRoutingModule { }
