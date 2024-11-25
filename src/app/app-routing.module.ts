import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactFormComponent} from "./contact-form/contact-form.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [

  { path: 'home', component :HomeComponent},
  { path: 'contact-form', component :ContactFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
