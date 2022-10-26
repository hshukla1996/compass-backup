import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPersonComponent } from './edit-person.component';

const routes: Routes = [
    { path: '', component: EditPersonComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditPersonRoutingModule { }