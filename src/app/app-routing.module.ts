import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactFormComponent} from "./contact-form/contact-form.component";

const routes: Routes = [
  { path: '', redirectTo: '/contact-form', pathMatch: 'full' },
  { path: 'contact-form', component :ContactFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
